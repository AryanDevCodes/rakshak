import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  MoreHorizontal,
  ShieldAlert,
  User,
  Users,
  Filter,
  Search,
  Download,
  Printer
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Report {
  id: string;
  type: string;
  location: string;
  date: string;
  status: 'new' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  district: string;
  complainant: string;
  contactNumber?: string;
  details?: string;
}

const mockReports: Report[] = [
  {
    id: 'FIR-2023-001',
    type: 'चोरी (Theft)',
    location: 'कनॉट प्लेस, नई दिल्ली',
    date: '2023-04-11T14:30:00Z',
    status: 'new',
    priority: 'medium',
    district: 'Central Delhi',
    complainant: 'अमित शर्मा',
    contactNumber: '+91 98765-43210',
    details: 'मोबाइल फोन की चोरी हो गई। संदिग्ध व्यक्ति लाल शर्ट में था।'
  },
  {
    id: 'FIR-2023-002',
    type: 'तोड़फोड़ (Vandalism)',
    location: 'लोधी गार्डन, नई दिल्ली',
    date: '2023-04-11T08:15:00Z',
    status: 'in-progress',
    priority: 'low',
    district: 'South Delhi',
    complainant: 'प्रिया पटेल',
    contactNumber: '+91 87654-32109',
    details: 'पार्क में सार्वजनिक संपत्ति को नुकसान पहुंचाया गया है।'
  },
  {
    id: 'FIR-2023-003',
    type: 'हमला (Assault)',
    location: 'करोल बाग मार्केट, नई दिल्ली',
    date: '2023-04-10T23:45:00Z',
    status: 'in-progress',
    priority: 'high',
    district: 'West Delhi',
    complainant: 'राहुल सिंह',
    contactNumber: '+91 76543-21098',
    details: 'दुकान के बाहर झगड़ा हुआ। एक व्यक्ति को चोट आई है।'
  },
  {
    id: 'FIR-2023-004',
    type: 'संदिग्ध गतिविधि (Suspicious Activity)',
    location: 'यमुना नदी के किनारे, नई दिल्ली',
    date: '2023-04-11T10:20:00Z',
    status: 'new',
    priority: 'medium',
    district: 'East Delhi',
    complainant: 'नेहा गुप्ता',
    contactNumber: '+91 65432-10987',
    details: 'नदी के पास कुछ संदिग्ध लोग देखे गए हैं।'
  },
  {
    id: 'FIR-2023-005',
    type: 'शोर शिकायत (Noise Complaint)',
    location: 'वसंत कुंज अपार्टमेंट, नई दिल्ली',
    date: '2023-04-11T01:30:00Z',
    status: 'resolved',
    priority: 'low',
    district: 'South Delhi',
    complainant: 'संजय वर्मा',
    contactNumber: '+91 54321-09876',
    details: 'रात में तेज आवाज से परेशानी हो रही है।'
  },
  {
    id: 'FIR-2023-006',
    type: '��ाइबर अपराध (Cybercrime)',
    location: 'गुड़गांव सेक्टर 14, हरियाणा',
    date: '2023-04-12T09:30:00Z',
    status: 'new',
    priority: 'high',
    district: 'Gurugram',
    complainant: 'अनिल आनंद',
    contactNumber: '+91 43210-98765',
    details: 'फर्जी बैंकिंग वेबसाइट से पैसे की धोखाधड़ी हुई है।'
  },
  {
    id: 'FIR-2023-007',
    type: 'यातायात उल्लंघन (Traffic Violation)',
    location: 'चांदनी चौक, नई दिल्ली',
    date: '2023-04-12T16:45:00Z',
    status: 'resolved',
    priority: 'low',
    district: 'North Delhi',
    complainant: 'विवेक जोशी',
    contactNumber: '+91 32109-87654',
    details: 'नो पार्किंग जोन में अवैध पार्किंग।'
  },
  {
    id: 'FIR-2023-008',
    type: 'महिला सुरक्षा (Women Safety)',
    location: 'साकेत मेट्रो स्टेशन, नई दिल्ली',
    date: '2023-04-13T19:20:00Z',
    status: 'in-progress',
    priority: 'high',
    district: 'South Delhi',
    complainant: 'स्वाति शर्मा',
    contactNumber: '+91 21098-76543',
    details: 'मेट्रो में परेशान करने वाले व्यक्ति की शिकायत।'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-500';
    case 'in-progress': return 'bg-amber-500';
    case 'resolved': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'new': return 'नया (New)';
    case 'in-progress': return 'प्रगति में (In Progress)';
    case 'resolved': return 'समाधानित (Resolved)';
    default: return 'अज्ञात (Unknown)';
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">उच्च (High)</Badge>;
    case 'medium':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">मध्यम (Medium)</Badge>;
    case 'low':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">निम्न (Low)</Badge>;
    default:
      return <Badge variant="outline">अज्ञात (Unknown)</Badge>;
  }
};

const OfficerDashboard = () => {
  const { user, role } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [districtFilter, setDistrictFilter] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const districts = Array.from(new Set(mockReports.map(report => report.district)));

  const filterReports = (reports: Report[]) => {
    return reports.filter(report => {
      const matchesSearch = searchQuery === "" || 
        report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.complainant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.id.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesPriority = priorityFilter === null || report.priority === priorityFilter;
      const matchesDistrict = districtFilter === null || report.district === districtFilter;
      
      return matchesSearch && matchesPriority && matchesDistrict;
    });
  };

  const handleReportAction = (report: Report, action: string) => {
    setSelectedReport(report);
    
    if (action === "review" || action === "details") {
      setShowDetails(true);
    } else if (action === "update") {
      setShowDetails(true);
    } else if (action === "assign") {
      toast({
        title: "केस असाइन किया गया",
        description: `FIR ${report.id} आपको असाइन किया गया है`,
        variant: "default",
      });
    } else if (action === "resolve") {
      toast({
        title: "केस समाधानित",
        description: `FIR ${report.id} को सफलतापूर्वक समाधानित किया गया`,
        variant: "default",
      });
    }
  };

  const handleExport = () => {
    toast({
      title: "रिपोर्ट निर्यात",
      description: "सभी रिपोर्ट एक्सेल फॉर्मेट में निर्यात की गई हैं",
    });
  };

  const handlePrint = () => {
    toast({
      title: "प्रिंट किया जा रहा है",
      description: "रिपोर्ट प्रिंट के लिए भेजी गई है",
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriorityFilter(null);
    setDistrictFilter(null);
  };

  const newReportsCount = mockReports.filter(r => r.status === 'new').length;
  const inProgressCount = mockReports.filter(r => r.status === 'in-progress').length;
  const resolvedCount = mockReports.filter(r => r.status === 'resolved').length;
  const highPriorityCount = mockReports.filter(r => r.priority === 'high').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-amber-900">
            {role === 'admin' ? 'प्रशासन डैशबोर्ड' : 'अधिकारी डैशबोर्ड'}
          </h2>
          <p className="text-muted-foreground">
            स्वागत है, {user?.name || 'अधिकारी जी'}। आपके पास {newReportsCount} नई रिपोर्ट समीक्षा के लिए हैं।
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="hidden md:block mr-4 text-right">
            <p className="text-sm font-medium">{user?.name || 'अधिकारी'}</p>
            <p className="text-xs text-muted-foreground">बैज #{user?.id?.split('-')[1] || '34891'}</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-orange-200">
            <AvatarFallback className="bg-orange-100 text-orange-700">{user?.name?.split(' ').map(n => n[0]).join('') || 'OP'}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              नई रिपोर्ट (New Reports)
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {newReportsCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <AlertTriangle className="mr-1 h-3 w-3" />
                <span>{highPriorityCount} उच्च प्राथमिकता</span>
              </div>
              <span>समीक्षा आवश्यक</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              प्रगति में (In Progress)
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {inProgressCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <div className="flex justify-between mb-1 text-xs">
                <span>प्रगति</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              इस सप्ताह समाधानित (Resolved This Week)
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {resolvedCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-600 text-xs">
              <CheckCircle className="mr-1 h-3 w-3" />
              <span>पिछले सप्ताह से +2 अधिक</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              प्रतिक्रिया समय (Response Time)
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              18 मिनट
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-amber-600 text-xs">
              <Clock className="mr-1 h-3 w-3" />
              <span>लक्ष्य: 15 मिनट</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="FIR, स्थान या शिकायतकर्ता द्वारा खोजें..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Select value={priorityFilter || ""} onValueChange={(val) => setPriorityFilter(val === "" ? null : val)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="प्राथमिकता" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">सभी प्राथमिकता</SelectItem>
                <SelectItem value="high">उच्च (High)</SelectItem>
                <SelectItem value="medium">मध्यम (Medium)</SelectItem>
                <SelectItem value="low">निम्न (Low)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={districtFilter || ""} onValueChange={(val) => setDistrictFilter(val === "" ? null : val)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="जिला" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">सभी जिले</SelectItem>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <Filter className="h-4 w-4 mr-1" />
              रीसेट
            </Button>
            
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-1" />
                निर्यात
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                प्रिंट
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="new" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="new" className="flex items-center">
                <Bell className="mr-1 h-4 w-4" />
                <span>नए (New)</span>
                <Badge className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                  {filterReports(mockReports.filter(r => r.status === 'new')).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>प्रगति में (In Progress)</span>
                <Badge className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                  {filterReports(mockReports.filter(r => r.status === 'in-progress')).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4" />
                <span>समाधानित (Resolved)</span>
                <Badge className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                  {filterReports(mockReports.filter(r => r.status === 'resolved')).length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>नई रिपोर्ट (New Reports)</CardTitle>
                <CardDescription>
                  इन नई रिपोर्टों की समीक्षा करें और असाइन करें
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterReports(mockReports.filter(report => report.status === 'new')).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      कोई रिपोर्ट नहीं मिली
                    </div>
                  ) : (
                    filterReports(mockReports.filter(report => report.status === 'new')).map(report => (
                      <div key={report.id} className="flex items-start justify-between p-3 border rounded-md">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-8 rounded-full ${getStatusColor(report.status)}`}></div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">
                                {report.type}
                              </h4>
                              <div className="ml-2">
                                {getPriorityBadge(report.priority)}
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground flex flex-col space-y-1">
                              <div className="flex items-center">
                                <FileText className="mr-1 h-3 w-3" />
                                <span>{report.id} - {report.complainant}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{report.location} ({report.district})</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>{new Date(report.date).toLocaleString('hi-IN')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleReportAction(report, 'details')}>
                            विवरण
                          </Button>
                          <Button size="sm" className="bg-orange-700 hover:bg-orange-800" onClick={() => handleReportAction(report, 'assign')}>
                            असाइन करें
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>प्रगति में रिपोर्ट (In Progress Reports)</CardTitle>
                <CardDescription>
                  जिन रिपोर्ट पर आप वर्तमान में काम कर रहे हैं
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterReports(mockReports.filter(report => report.status === 'in-progress')).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      कोई रिपोर्ट नहीं मिली
                    </div>
                  ) : (
                    filterReports(mockReports.filter(report => report.status === 'in-progress')).map(report => (
                      <div key={report.id} className="flex items-start justify-between p-3 border rounded-md">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-8 rounded-full ${getStatusColor(report.status)}`}></div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">
                                {report.type}
                              </h4>
                              <div className="ml-2">
                                {getPriorityBadge(report.priority)}
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground flex flex-col space-y-1">
                              <div className="flex items-center">
                                <FileText className="mr-1 h-3 w-3" />
                                <span>{report.id} - {report.complainant}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{report.location} ({report.district})</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>{new Date(report.date).toLocaleString('hi-IN')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleReportAction(report, 'details')}>
                            विवरण
                          </Button>
                          <Button size="sm" className="bg-green-700 hover:bg-green-800" onClick={() => handleReportAction(report, 'resolve')}>
                            समाधान करें
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resolved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>समाधानित रिपोर्ट (Resolved Reports)</CardTitle>
                <CardDescription>
                  सफलतापूर्वक पूरी की गई रिपोर्ट
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filterReports(mockReports.filter(report => report.status === 'resolved')).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      कोई रिपोर्ट नहीं मिली
                    </div>
                  ) : (
                    filterReports(mockReports.filter(report => report.status === 'resolved')).map(report => (
                      <div key={report.id} className="flex items-start justify-between p-3 border rounded-md">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-8 rounded-full ${getStatusColor(report.status)}`}></div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">
                                {report.type}
                              </h4>
                              <div className="ml-2">
                                {getPriorityBadge(report.priority)}
                              </div>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground flex flex-col space-y-1">
                              <div className="flex items-center">
                                <FileText className="mr-1 h-3 w-3" />
                                <span>{report.id} - {report.complainant}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{report.location} ({report.district})</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>{new Date(report.date).toLocaleString('hi-IN')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => handleReportAction(report, 'details')}>
                          देखें
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

      {showDetails && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-amber-900">{selectedReport.type}</h2>
                  <p className="text-muted-foreground">FIR: {selectedReport.id}</p>
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
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">शिकायतकर्ता</h3>
                  <p className="font-medium">{selectedReport.complainant}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">संपर्क</h3>
                  <p>{selectedReport.contactNumber || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">स्थान</h3>
                  <p>{selectedReport.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">जिला</h3>
                  <p>{selectedReport.district}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">दिनांक और समय</h3>
                  <p>{new Date(selectedReport.date).toLocaleString('hi-IN')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">स्थिति</h3>
                  <p>{getStatusText(selectedReport.status)}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">विवरण</h3>
                <div className="p-3 bg-amber-50 rounded-md">
                  <p>{selectedReport.details || 'कोई विवरण उपलब्ध नहीं है।'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">नोट्स</h3>
                <textarea 
                  className="w-full p-3 border rounded-md"
                  rows={3}
                  placeholder="केस के बारे में अपने नोट्स जोड़ें..."
                ></textarea>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  बंद करें
                </Button>
                {selectedReport.status === 'new' && (
                  <Button className="bg-orange-700 hover:bg-orange-800" onClick={() => {
                    handleReportAction(selectedReport, 'assign');
                    setShowDetails(false);
                  }}>
                    स्वयं को असाइन करें
                  </Button>
                )}
                {selectedReport.status === 'in-progress' && (
                  <Button className="bg-green-700 hover:bg-green-800" onClick={() => {
                    handleReportAction(selectedReport, 'resolve');
                    setShowDetails(false);
                  }}>
                    समाधान के रूप में चिह्नित करें
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficerDashboard;
