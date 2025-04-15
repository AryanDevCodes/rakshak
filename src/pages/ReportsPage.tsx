
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { FileText, Search, Filter, Download, Printer, MapPin, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

// Report types and mock data
interface Report {
  id: string;
  title: string;
  category: string;
  location: string;
  district: string;
  date: string;
  status: 'pending' | 'verified' | 'resolved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  reportedBy: string;
  description: string;
}

const mockReports: Report[] = [
  {
    id: 'REPORT-2023-001',
    title: 'Vehicle Theft',
    category: 'Theft',
    location: 'Connaught Place, New Delhi',
    district: 'Central Delhi',
    date: '2023-04-11T14:30:00Z',
    status: 'pending',
    priority: 'medium',
    reportedBy: 'Amit Sharma',
    description: 'My car was stolen from the parking lot. It is a white Honda City with registration DL5CAB1234.'
  },
  {
    id: 'REPORT-2023-002',
    title: 'Park Vandalism',
    category: 'Vandalism',
    location: 'Lodhi Garden, New Delhi',
    district: 'South Delhi',
    date: '2023-04-11T08:15:00Z',
    status: 'verified',
    priority: 'low',
    reportedBy: 'Priya Patel',
    description: 'Public property in the park has been damaged by a group of teenagers.'
  },
  {
    id: 'REPORT-2023-003',
    title: 'Street Fight',
    category: 'Assault',
    location: 'Karol Bagh Market, New Delhi',
    district: 'West Delhi',
    date: '2023-04-10T23:45:00Z',
    status: 'verified',
    priority: 'high',
    reportedBy: 'Rahul Singh',
    description: 'A fight broke out outside the shop. One person has been injured and needed medical attention.'
  },
  {
    id: 'REPORT-2023-004',
    title: 'Suspicious Activity',
    category: 'Suspicious Activity',
    location: 'Yamuna River Bank, New Delhi',
    district: 'East Delhi',
    date: '2023-04-11T10:20:00Z',
    status: 'rejected',
    priority: 'medium',
    reportedBy: 'Neha Gupta',
    description: 'Some suspicious individuals have been spotted near the river bank at night.'
  },
  {
    id: 'REPORT-2023-005',
    title: 'Noise Complaint',
    category: 'Noise Complaint',
    location: 'Vasant Kunj Apartments, New Delhi',
    district: 'South Delhi',
    date: '2023-04-11T01:30:00Z',
    status: 'resolved',
    priority: 'low',
    reportedBy: 'Sanjay Verma',
    description: 'Loud music and noise disturbance from apartment 402 during late hours.'
  },
  {
    id: 'REPORT-2023-006',
    title: 'Online Banking Fraud',
    category: 'Cybercrime',
    location: 'Gurgaon Sector 14, Haryana',
    district: 'Gurugram',
    date: '2023-04-12T09:30:00Z',
    status: 'pending',
    priority: 'high',
    reportedBy: 'Anil Anand',
    description: 'Lost Rs. 50,000 through a fraudulent banking website that looked genuine.'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-500';
    case 'verified': return 'bg-blue-500';
    case 'resolved': return 'bg-green-500';
    case 'rejected': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case 'verified':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Verified</Badge>;
    case 'resolved':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const ReportsPage = () => {
  const { toast } = useToast();
  const { role } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [districtFilter, setDistrictFilter] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Get unique categories and districts from reports
  const categories = Array.from(new Set(mockReports.map(report => report.category)));
  const districts = Array.from(new Set(mockReports.map(report => report.district)));

  // Filter reports based on search, status, category, and district
  const filterReports = (reports: Report[]) => {
    return reports.filter(report => {
      const matchesSearch = searchQuery === "" || 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === null || report.status === statusFilter;
      const matchesCategory = categoryFilter === null || report.category === categoryFilter;
      const matchesDistrict = districtFilter === null || report.district === districtFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesDistrict;
    });
  };

  const handleReportAction = (report: Report, action: string) => {
    setSelectedReport(report);
    
    if (action === "view") {
      setShowDetails(true);
    } else if (action === "verify") {
      toast({
        title: "Report Verified",
        description: `Report ${report.id} has been verified successfully`,
        variant: "default",
      });
    } else if (action === "resolve") {
      toast({
        title: "Report Resolved",
        description: `Report ${report.id} has been marked as resolved`,
        variant: "default",
      });
    } else if (action === "reject") {
      toast({
        title: "Report Rejected",
        description: `Report ${report.id} has been rejected`,
        variant: "default",
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "Report Export",
      description: "All reports have been exported to Excel format",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Printing",
      description: "Reports are being sent to printer",
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter(null);
    setCategoryFilter(null);
    setDistrictFilter(null);
  };

  const pageTitle = role === 'admin' 
    ? "Report Management (Admin)"
    : "Report Management";

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-orange-700 mr-2" />
            <h1 className="text-2xl font-bold text-amber-900">{pageTitle}</h1>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-amber-200 shadow-sm">
            <div className="mb-4">
              <p className="text-amber-800">
                Manage all incident reports submitted by citizens. You can filter, sort, and take action on reports based on their status.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID, title, location or reporter..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <Select value={statusFilter || ""} onValueChange={(val) => setStatusFilter(val === "" ? null : val)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter || ""} onValueChange={(val) => setCategoryFilter(val === "" ? null : val)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={districtFilter || ""} onValueChange={(val) => setDistrictFilter(val === "" ? null : val)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {districts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    <Filter className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  
                  <div className="flex items-center gap-2 ml-auto">
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">
                    All Reports 
                    <Badge className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                      {filterReports(mockReports).length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending
                    <Badge className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                      {filterReports(mockReports.filter(r => r.status === 'pending')).length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="verified">
                    Verified
                    <Badge className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                      {filterReports(mockReports.filter(r => r.status === 'verified')).length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="resolved">
                    Resolved
                    <Badge className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                      {filterReports(mockReports.filter(r => r.status === 'resolved')).length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                
                {/* All Reports Tab */}
                <TabsContent value="all" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>All Reports</CardTitle>
                      <CardDescription>
                        View all reports from citizens
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filterReports(mockReports).length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            No reports found
                          </div>
                        ) : (
                          filterReports(mockReports).map(report => (
                            <div key={report.id} className="flex items-start justify-between p-3 border rounded-md">
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-8 rounded-full ${getStatusColor(report.status)}`}></div>
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="font-medium">
                                      {report.title}
                                    </h4>
                                    <div className="ml-2">
                                      {getPriorityBadge(report.priority)}
                                    </div>
                                    <div className="ml-2">
                                      {getStatusBadge(report.status)}
                                    </div>
                                  </div>
                                  <div className="mt-1 text-sm text-muted-foreground flex flex-col space-y-1">
                                    <div className="flex items-center">
                                      <FileText className="mr-1 h-3 w-3" />
                                      <span>{report.id} - {report.category}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="mr-1 h-3 w-3" />
                                      <span>{report.location} ({report.district})</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="mr-1 h-3 w-3" />
                                      <span>{new Date(report.date).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Tag className="mr-1 h-3 w-3" />
                                      <span>Reported by: {report.reportedBy}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => handleReportAction(report, 'view')}>
                                View Details
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Pending Reports Tab */}
                <TabsContent value="pending" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Reports</CardTitle>
                      <CardDescription>
                        Reports awaiting verification and action
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filterReports(mockReports.filter(report => report.status === 'pending')).length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            No pending reports found
                          </div>
                        ) : (
                          filterReports(mockReports.filter(report => report.status === 'pending')).map(report => (
                            <div key={report.id} className="flex items-start justify-between p-3 border rounded-md">
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-8 rounded-full ${getStatusColor(report.status)}`}></div>
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="font-medium">
                                      {report.title}
                                    </h4>
                                    <div className="ml-2">
                                      {getPriorityBadge(report.priority)}
                                    </div>
                                  </div>
                                  <div className="mt-1 text-sm text-muted-foreground flex flex-col space-y-1">
                                    <div className="flex items-center">
                                      <FileText className="mr-1 h-3 w-3" />
                                      <span>{report.id} - {report.category}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="mr-1 h-3 w-3" />
                                      <span>{report.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="mr-1 h-3 w-3" />
                                      <span>Reported {new Date(report.date).toLocaleDateString('en-IN')}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleReportAction(report, 'view')}>
                                  View
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleReportAction(report, 'verify')}>
                                  Verify
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Verified Reports Tab */}
                <TabsContent value="verified" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Verified Reports</CardTitle>
                      <CardDescription>
                        Reports that have been verified and are being processed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filterReports(mockReports.filter(report => report.status === 'verified')).length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            No verified reports found
                          </div>
                        ) : (
                          filterReports(mockReports.filter(report => report.status === 'verified')).map(report => (
                            <div key={report.id} className="flex items-start justify-between p-3 border rounded-md">
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-8 rounded-full ${getStatusColor(report.status)}`}></div>
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="font-medium">
                                      {report.title}
                                    </h4>
                                    <div className="ml-2">
                                      {getPriorityBadge(report.priority)}
                                    </div>
                                  </div>
                                  <div className="mt-1 text-sm text-muted-foreground flex flex-col space-y-1">
                                    <div className="flex items-center">
                                      <FileText className="mr-1 h-3 w-3" />
                                      <span>{report.id} - {report.category}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="mr-1 h-3 w-3" />
                                      <span>{report.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="mr-1 h-3 w-3" />
                                      <span>Verified on {new Date().toLocaleDateString('en-IN')}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleReportAction(report, 'view')}>
                                  View
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleReportAction(report, 'resolve')}>
                                  Resolve
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Resolved Reports Tab */}
                <TabsContent value="resolved" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resolved Reports</CardTitle>
                      <CardDescription>
                        Reports that have been successfully resolved
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filterReports(mockReports.filter(report => report.status === 'resolved')).length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            No resolved reports found
                          </div>
                        ) : (
                          filterReports(mockReports.filter(report => report.status === 'resolved')).map(report => (
                            <div key={report.id} className="flex items-start justify-between p-3 border rounded-md">
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-8 rounded-full ${getStatusColor(report.status)}`}></div>
                                <div>
                                  <div className="flex items-center">
                                    <h4 className="font-medium">
                                      {report.title}
                                    </h4>
                                    <div className="ml-2">
                                      {getPriorityBadge(report.priority)}
                                    </div>
                                  </div>
                                  <div className="mt-1 text-sm text-muted-foreground flex flex-col space-y-1">
                                    <div className="flex items-center">
                                      <FileText className="mr-1 h-3 w-3" />
                                      <span>{report.id} - {report.category}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="mr-1 h-3 w-3" />
                                      <span>{report.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="mr-1 h-3 w-3" />
                                      <span>Resolved on {new Date().toLocaleDateString('en-IN')}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" onClick={() => handleReportAction(report, 'view')}>
                                View
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Report Detail Modal */}
        {showDetails && selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-amber-900">{selectedReport.title}</h2>
                    <p className="text-muted-foreground">Report ID: {selectedReport.id}</p>
                  </div>
                  <div className="flex items-center">
                    {getPriorityBadge(selectedReport.priority)}
                    <Button variant="ghost" size="sm" className="ml-2" onClick={() => setShowDetails(false)}>
                      ✕
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Reported By</h3>
                    <p className="font-medium">{selectedReport.reportedBy}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
                    <p>{selectedReport.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                    <p>{selectedReport.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">District</h3>
                    <p>{selectedReport.district}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h3>
                    <p>{new Date(selectedReport.date).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                    <p>{getStatusBadge(selectedReport.status)}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                  <div className="p-3 bg-amber-50 rounded-md">
                    <p>{selectedReport.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Officer Notes</h3>
                  <textarea 
                    className="w-full p-3 border rounded-md"
                    rows={3}
                    placeholder="Add your notes about this report..."
                  ></textarea>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowDetails(false)}>
                    Close
                  </Button>
                  
                  {selectedReport.status === 'pending' && (
                    <>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                        handleReportAction(selectedReport, 'verify');
                        setShowDetails(false);
                      }}>
                        Verify Report
                      </Button>
                      <Button variant="destructive" onClick={() => {
                        handleReportAction(selectedReport, 'reject');
                        setShowDetails(false);
                      }}>
                        Reject Report
                      </Button>
                    </>
                  )}
                  {selectedReport.status === 'verified' && (
                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                      handleReportAction(selectedReport, 'resolve');
                      setShowDetails(false);
                    }}>
                      Mark as Resolved
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
