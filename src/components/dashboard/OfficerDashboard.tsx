
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Added this import to fix Button errors
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
  Users
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Report {
  id: string;
  type: string;
  location: string;
  date: string;
  status: 'new' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
}

const mockReports: Report[] = [
  {
    id: 'R-2023-001',
    type: 'Theft',
    location: 'Main Street & 5th Avenue',
    date: '2023-04-11T14:30:00Z',
    status: 'new',
    priority: 'medium'
  },
  {
    id: 'R-2023-002',
    type: 'Vandalism',
    location: 'City Park',
    date: '2023-04-11T08:15:00Z',
    status: 'in-progress',
    priority: 'low'
  },
  {
    id: 'R-2023-003',
    type: 'Assault',
    location: 'Downtown Bar & Grill',
    date: '2023-04-10T23:45:00Z',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'R-2023-004',
    type: 'Suspicious Activity',
    location: 'Riverfront Park',
    date: '2023-04-11T10:20:00Z',
    status: 'new',
    priority: 'medium'
  },
  {
    id: 'R-2023-005',
    type: 'Noise Complaint',
    location: 'Apartment Complex B',
    date: '2023-04-11T01:30:00Z',
    status: 'resolved',
    priority: 'low'
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

const OfficerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Officer Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, Officer Johnson. You have 3 new reports to review.
          </p>
        </div>
        
        <div className="flex items-center">
          <div className="hidden md:block mr-4 text-right">
            <p className="text-sm font-medium">Jane Johnson</p>
            <p className="text-xs text-muted-foreground">Badge #34891</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-police-200">
            <AvatarFallback className="bg-police-100 text-police-700">JJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Reports
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {mockReports.filter(r => r.status === 'new').length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                <AlertTriangle className="mr-1 h-3 w-3" />
                <span>2 high priority</span>
              </div>
              <span>Needs review</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {mockReports.filter(r => r.status === 'in-progress').length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <div className="flex justify-between mb-1 text-xs">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved This Week
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              8
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-600 text-xs">
              <CheckCircle className="mr-1 h-3 w-3" />
              <span>+3 from previous week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="new" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="new" className="flex items-center">
              <Bell className="mr-1 h-4 w-4" />
              <span>New</span>
              <Badge className="ml-2 bg-police-100 text-police-700 hover:bg-police-100">
                {mockReports.filter(r => r.status === 'new').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>In Progress</span>
              <Badge className="ml-2 bg-police-100 text-police-700 hover:bg-police-100">
                {mockReports.filter(r => r.status === 'in-progress').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center">
              <CheckCircle className="mr-1 h-4 w-4" />
              <span>Resolved</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>New Reports</CardTitle>
              <CardDescription>
                Review and assign these new reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports
                  .filter(report => report.status === 'new')
                  .map(report => (
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
                              <span>{report.id}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              <span>{report.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{new Date(report.date).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-police-700 hover:bg-police-800">
                        Review
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Reports</CardTitle>
              <CardDescription>
                Reports you're currently working on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports
                  .filter(report => report.status === 'in-progress')
                  .map(report => (
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
                              <span>{report.id}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              <span>{report.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{new Date(report.date).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Reports</CardTitle>
              <CardDescription>
                Successfully completed reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports
                  .filter(report => report.status === 'resolved')
                  .map(report => (
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
                              <span>{report.id}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              <span>{report.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{new Date(report.date).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfficerDashboard;
