
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Bell, Moon, Palette, Shield, User, Globe, Lock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import { useToast } from '@/hooks/use-toast';

const SettingsPanel = () => {
  const { user, role } = useAuth();
  const { toast } = useToast();
  
  const handleSettingSaved = () => {
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full h-auto p-0 bg-gray-100 rounded-t-lg">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white rounded-none rounded-tl-lg py-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white rounded-none py-3 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-white rounded-none py-3 flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          
          {/* Only show Security tab for officers and admins */}
          {(role === 'officer' || role === 'admin') && (
            <TabsTrigger value="security" className="data-[state=active]:bg-white rounded-none py-3 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          )}
          
          {/* Only show System tab for admins */}
          {role === 'admin' && (
            <TabsTrigger value="system" className="data-[state=active]:bg-white rounded-none py-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="profile" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <ProfileSettings user={user} onSave={handleSettingSaved} />
        </TabsContent>
        
        <TabsContent value="notifications" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <NotificationSettings onSave={handleSettingSaved} />
        </TabsContent>
        
        <TabsContent value="appearance" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>
                Customize how SafeCity looks for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4" />
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="space-y-3">
                  <Label>Color Theme</Label>
                  <RadioGroup defaultValue="blue" className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="blue" id="blue" />
                      <Label htmlFor="blue" className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-police-700 mr-2"></div>
                        Blue (Default)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="green" id="green" />
                      <Label htmlFor="green" className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-green-700 mr-2"></div>
                        Green
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="purple" id="purple" />
                      <Label htmlFor="purple" className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-purple-700 mr-2"></div>
                        Purple
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security tab for officers and admins */}
        {(role === 'officer' || role === 'admin') && (
          <TabsContent value="security" className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage security settings for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="two-factor">Two-factor Authentication</Label>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="session-timeout">Auto-logout after inactivity</Label>
                    </div>
                    <Switch id="session-timeout" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
        {/* System tab for admins only */}
        {role === 'admin' && (
          <TabsContent value="system" className="p-6">
            <h2 className="text-xl font-semibold mb-4">System Settings</h2>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>
                  Global settings for the SafeCity platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <Label htmlFor="public-map">Public Crime Map</Label>
                    </div>
                    <Switch id="public-map" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <Label htmlFor="auto-alerts">Automated Alert System</Label>
                    </div>
                    <Switch id="auto-alerts" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="require-approval">Require Report Approval</Label>
                    </div>
                    <Switch id="require-approval" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Configure data retention policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="data-retention">Data retention period</Label>
                    <select 
                      id="data-retention" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="180">6 months</option>
                      <option value="365">1 year</option>
                      <option value="730">2 years</option>
                      <option value="0">Indefinite</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
