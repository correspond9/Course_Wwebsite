import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { toast } from '../hooks/use-toast';
import { BookOpen, Users, Settings, TrendingUp, Plus, Edit, Trash2, DollarSign } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalCourses: 0, totalLeads: 0, newLeads: 0 });
  const [courses, setCourses] = useState([]);
  const [leads, setLeads] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});
  const [paymentSettings, setPaymentSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: '',
    duration: '',
    language: '',
    features: '',
    price: 0,
    discountPrice: null,
    instructor: '',
    description: '',
  });
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, coursesRes, leadsRes, settingsRes, paymentRes] = await Promise.all([
        axios.get(`${API}/stats`),
        axios.get(`${API}/courses`),
        axios.get(`${API}/leads`),
        axios.get(`${API}/site-settings`),
        axios.get(`${API}/payment-gateway`)
      ]);

      setStats(statsRes.data);
      setCourses(coursesRes.data);
      setLeads(leadsRes.data);
      setSiteSettings(settingsRes.data);
      setPaymentSettings(paymentRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: 'Error', description: 'Failed to load data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        await axios.put(`${API}/courses/${editingCourseId}`, courseForm);
        toast({ title: 'Success', description: 'Course updated successfully' });
      } else {
        await axios.post(`${API}/courses`, courseForm);
        toast({ title: 'Success', description: 'Course created successfully' });
      }
      resetCourseForm();
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save course', variant: 'destructive' });
    }
  };

  const handleEditCourse = (course) => {
    setCourseForm(course);
    setEditingCourseId(course.id);
    setActiveTab('courses');
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`${API}/courses/${courseId}`);
        toast({ title: 'Success', description: 'Course deleted successfully' });
        fetchData();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete course', variant: 'destructive' });
      }
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      category: '',
      duration: '',
      language: '',
      features: '',
      price: 0,
      discountPrice: null,
      instructor: '',
      description: '',
    });
    setEditingCourseId(null);
  };

  const handleUpdateLeadStatus = async (leadId, status) => {
    try {
      await axios.put(`${API}/leads/${leadId}?status=${status}`);
      toast({ title: 'Success', description: 'Lead status updated' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update lead', variant: 'destructive' });
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await axios.delete(`${API}/leads/${leadId}`);
        toast({ title: 'Success', description: 'Lead deleted successfully' });
        fetchData();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete lead', variant: 'destructive' });
      }
    }
  };

  const handleUpdateSiteSettings = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/site-settings`, siteSettings);
      toast({ title: 'Success', description: 'Site settings updated' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update settings', variant: 'destructive' });
    }
  };

  const handleUpdatePaymentSettings = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/payment-gateway`, paymentSettings);
      toast({ title: 'Success', description: 'Payment settings updated' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update payment settings', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-600">Manage your courses, leads, and settings</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="border-slate-200">View Site</Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-navy data-[state=active]:text-white rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="courses" className="data-[state=active]:bg-navy data-[state=active]:text-white rounded-lg">Courses</TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-navy data-[state=active]:text-white rounded-lg">Leads</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-navy data-[state=active]:text-white rounded-lg">Settings</TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-navy data-[state=active]:text-white rounded-lg">Payment</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-soft-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Courses</CardTitle>
                  <BookOpen className="text-navy" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{stats.totalCourses}</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Leads</CardTitle>
                  <Users className="text-navy" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{stats.totalLeads}</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">New Leads</CardTitle>
                  <TrendingUp className="text-navy" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{stats.newLeads}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-soft-lg">
              <CardHeader>
                <CardTitle className="text-slate-900">Recent Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.slice(0, 5).map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.course || 'General'}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                            lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                            lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {lead.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Course Form */}
              <Card className="border-0 shadow-soft-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900">
                    {editingCourseId ? 'Edit Course' : 'Create New Course'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        value={courseForm.title}
                        onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                        required
                        className="rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={courseForm.category} onValueChange={(value) => setCourseForm({ ...courseForm, category: value })}>
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="strategy">Strategy</SelectItem>
                            <SelectItem value="trader">Trader</SelectItem>
                            <SelectItem value="investor">Investor</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={courseForm.duration}
                          onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                          placeholder="e.g., 6 Month Validity"
                          required
                          className="rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Input
                          id="language"
                          value={courseForm.language}
                          onChange={(e) => setCourseForm({ ...courseForm, language: e.target.value })}
                          placeholder="e.g., Hindi & English"
                          required
                          className="rounded-lg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="instructor">Instructor</Label>
                        <Input
                          id="instructor"
                          value={courseForm.instructor}
                          onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                          required
                          className="rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="features">Features</Label>
                      <Input
                        id="features"
                        value={courseForm.features}
                        onChange={(e) => setCourseForm({ ...courseForm, features: e.target.value })}
                        placeholder="e.g., Study of Charts"
                        required
                        className="rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={courseForm.price}
                          onChange={(e) => setCourseForm({ ...courseForm, price: parseFloat(e.target.value) })}
                          required
                          className="rounded-lg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
                        <Input
                          id="discountPrice"
                          type="number"
                          value={courseForm.discountPrice || ''}
                          onChange={(e) => setCourseForm({ ...courseForm, discountPrice: e.target.value ? parseFloat(e.target.value) : null })}
                          className="rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                        rows={4}
                        required
                        className="rounded-lg"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="bg-navy hover:bg-navy-dark text-white rounded-lg">
                        {editingCourseId ? 'Update Course' : 'Create Course'}
                      </Button>
                      {editingCourseId && (
                        <Button type="button" variant="outline" onClick={resetCourseForm} className="rounded-lg">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Courses List */}
              <Card className="border-0 shadow-soft-lg">
                <CardHeader>
                  <CardTitle className="text-slate-900">All Courses ({courses.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {courses.map((course) => (
                      <div key={course.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-slate-900">{course.title}</h4>
                            <p className="text-sm text-slate-600 mt-1">
                              {course.category} • {course.duration} • ₹{course.discountPrice || course.price}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditCourse(course)}
                              className="text-navy hover:bg-navy/10"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteCourse(course.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card className="border-0 shadow-soft-lg">
              <CardHeader>
                <CardTitle className="text-slate-900">All Leads ({leads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.course || 'General'}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <Select value={lead.status} onValueChange={(value) => handleUpdateLeadStatus(lead.id, value)}>
                            <SelectTrigger className="w-32 rounded-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-0 shadow-soft-lg max-w-2xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Site Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateSiteSettings} className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      value={siteSettings.siteDescription}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={siteSettings.logo}
                      onChange={(e) => setSiteSettings({ ...siteSettings, logo: e.target.value })}
                      placeholder="/path/to/logo.png"
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="whatsappNumber">WhatsApp Number (without +)</Label>
                    <Input
                      id="whatsappNumber"
                      value={siteSettings.whatsappNumber}
                      onChange={(e) => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                      placeholder="919870510511"
                      className="rounded-lg"
                    />
                  </div>

                  <Button type="submit" className="bg-navy hover:bg-navy-dark text-white rounded-lg">
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card className="border-0 shadow-soft-lg max-w-2xl">
              <CardHeader>
                <CardTitle className="text-slate-900">Payment Gateway Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePaymentSettings} className="space-y-4">
                  <div>
                    <Label htmlFor="provider">Payment Provider</Label>
                    <Select value={paymentSettings.provider} onValueChange={(value) => setPaymentSettings({ ...paymentSettings, provider: value })}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="razorpay">Razorpay</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="enabled">Enable Payment Gateway</Label>
                    <Switch
                      id="enabled"
                      checked={paymentSettings.enabled}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="testMode">Test Mode</Label>
                    <Switch
                      id="testMode"
                      checked={paymentSettings.testMode}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, testMode: checked })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={paymentSettings.apiKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, apiKey: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apiSecret">API Secret</Label>
                    <Input
                      id="apiSecret"
                      type="password"
                      value={paymentSettings.apiSecret}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, apiSecret: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="webhookSecret">Webhook Secret (Optional)</Label>
                    <Input
                      id="webhookSecret"
                      type="password"
                      value={paymentSettings.webhookSecret || ''}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, webhookSecret: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>

                  <Button type="submit" className="bg-navy hover:bg-navy-dark text-white rounded-lg">
                    Save Payment Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;