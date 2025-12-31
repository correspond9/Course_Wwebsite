class DhanSocket {
    constructor() {
        this.socket = null;
        this.listeners = new Set();
        this.statusListeners = new Set();
        this.connectionStatus = 'DISCONNECTED';
        this.reconnectTimer = null;
    }

    connect() {
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) return;

        const accessToken = localStorage.getItem('dhan_access_token');
        const clientId = localStorage.getItem('dhan_client_id');

        if (!accessToken || !clientId) {
            this.updateStatus('MISSING_KEYS');
            return;
        }

        const url = `wss://api-feed.dhan.co?version=2&token=${accessToken}&clientId=${clientId}&authType=2`;

        try {
            this.socket = new WebSocket(url);
            this.socket.binaryType = 'arraybuffer';

            this.socket.onopen = () => {
                console.log("DhanSocket: Connected");
                this.updateStatus('CONNECTED');
                this.subscribe();
            };

            this.socket.onmessage = (event) => {
                if (event.data instanceof ArrayBuffer) {
                    this.parsePacket(event.data);
                }
            };

            this.socket.onclose = (event) => {
                this.updateStatus('DISCONNECTED');
                if (event.code !== 1000) {
                    clearTimeout(this.reconnectTimer);
                    this.reconnectTimer = setTimeout(() => this.connect(), 4000);
                }
            };

            this.socket.onerror = (error) => {
                console.error("DhanSocket Error:", error);
                this.socket.close();
            };

        } catch (e) {
            this.updateStatus('ERROR');
        }
    }

    subscribe() {
        if (this.socket?.readyState !== WebSocket.OPEN) return;

        const request = {
            "RequestCode": 15,
            "InstrumentCount": 12,
            "InstrumentList": [
                { "ExchangeSegment": "IDX_I", "SecurityId": "13" },    // Nifty
                { "ExchangeSegment": "IDX_I", "SecurityId": "25" },    // Bank Nifty
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "2885" }, // RELIANCE
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "1333" }, // HDFC
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "11536" },// TCS
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "1594" }, // INFY
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "4963" }, // ICICI
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "3045" }, // SBIN
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "1660" }, // ITC
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "1922" }, // KOTAK
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "11483" },// LT
                { "ExchangeSegment": "NSE_EQ", "SecurityId": "5900" }  // AXIS
            ]
        };

        this.socket.send(JSON.stringify(request));
    }

    parsePacket(arrayBuffer) {
        if (arrayBuffer.byteLength < 8) return;
        
        const view = new DataView(arrayBuffer);
        try {
            const securityId = view.getInt32(4, true).toString(); 
            if (arrayBuffer.byteLength >= 12) {
                const ltp = view.getFloat32(8, true);
                if (ltp > 0) {
                    this.listeners.forEach(callback => callback(securityId, ltp));
                }
            }
        } catch (e) {
            console.error("Parse Error", e);
        }
    }

    updateStatus(status) {
        this.connectionStatus = status;
        this.statusListeners.forEach(cb => cb(status));
    }

    onPriceUpdate(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    onStatusChange(callback) {
        this.statusListeners.add(callback);
        callback(this.connectionStatus);
        return () => this.statusListeners.delete(callback);
    }
}

const dhanSocket = new DhanSocket();
export default dhanSocket;
