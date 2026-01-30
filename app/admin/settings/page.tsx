"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, Globe, Shield, Bell, Database } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Asstory",
    siteDescription: "Property Valuation Platform",
    contactEmail: "info@asstory.com",
    supportEmail: "support@asstory.com",
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false,
    apiRateLimit: "1000",
    maxFileSize: "10",
    enableAnalytics: true,
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Handle save logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-600">
            Manage system settings and configuration
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, siteName: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    siteDescription: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    contactEmail: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    supportEmail: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable User Registration</Label>
                <p className="text-sm text-slate-600">
                  Allow new users to register
                </p>
              </div>
              <Switch
                checked={settings.enableRegistration}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    enableRegistration: checked,
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-slate-600">
                  Put site in maintenance mode
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                }
              />
            </div>
            <div>
              <Label htmlFor="apiRateLimit">API Rate Limit (per hour)</Label>
              <Input
                id="apiRateLimit"
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    apiRateLimit: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    maxFileSize: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Notifications</Label>
                <p className="text-sm text-slate-600">
                  Send email notifications
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    enableNotifications: checked,
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Analytics</Label>
                <p className="text-sm text-slate-600">Track user analytics</p>
              </div>
              <Switch
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, enableAnalytics: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Database Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">
                Database Status
              </h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Connected</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Backup Database
              </Button>
              <Button variant="outline" className="w-full">
                Optimize Database
              </Button>
              <Button variant="outline" className="w-full">
                View Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Version</h4>
              <p className="text-slate-600">Asstory v2.1.0</p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Last Updated</h4>
              <p className="text-slate-600">January 15, 2024</p>
            </div>
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Server Status</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-600">Online</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
