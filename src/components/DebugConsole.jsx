import React, { useState, useEffect } from 'react';
import dhanSocket from '../services/DhanSocket';

const DebugConsole = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsubscribe = dhanSocket.onRawData((data) => {
      setLogs(prev => [data, ...prev].slice(0, 50));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800">RAW DATA STREAM</h2>
        <button onClick={() => setLogs([])} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase">Clear</button>
      </div>

      <div className="bg-slate-900 rounded-[2rem] p-8 font-mono text-[11px] border border-slate-800 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 border-b border-slate-800 pb-4 mb-4 text-slate-500 font-bold">
          <div className="col-span-2">TIMESTAMP</div>
          <div className="col-span-1">SIZE</div>
          <div className="col-span-9">HEXADECIMAL PAYLOAD</div>
        </div>
        
        <div className="space-y-3 h-[600px] overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 animate-in fade-in slide-in-from-left-2">
              <div className="col-span-2 text-emerald-400/80">{log.timestamp}</div>
              <div className="col-span-1 text-blue-400">{log.length}B</div>
              <div className="col-span-9 text-slate-400 break-all leading-relaxed">{log.bytes}</div>
            </div>
          ))}
          {logs.length === 0 && <div className="text-slate-600 py-20 text-center uppercase tracking-widest">Awaiting Binary Packets...</div>}
        </div>
      </div>
    </div>
  );
};

export default DebugConsole;