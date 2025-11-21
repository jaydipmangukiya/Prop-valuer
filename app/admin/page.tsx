"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, FileText, TrendingUp, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', icon: <Users className="h-6 w-6" />, color: 'text-blue-600' },
    { title: 'Properties Listed', value: '856', change: '+8%', icon: <Building2 className="h-6 w-6" />, color: 'text-emerald-600' },
    { title: 'Valuations Today', value: '45', change: '+23%', icon: <FileText className="h-6 w-6" />, color: 'text-orange-600' },
    { title: 'Revenue', value: '₹2.4L', change: '+15%', icon: <TrendingUp className="h-6 w-6" />, color: 'text-purple-600' },
  ];

  const recentActivities = [
    { type: 'user', message: 'New user registered: john@example.com', time: '2 minutes ago' },
    { type: 'property', message: 'Property added in Mumbai, Bandra West', time: '15 minutes ago' },
    { type: 'valuation', message: 'Valuation completed for ₹2.5 Cr property', time: '1 hour ago' },
    { type: 'user', message: 'User updated profile: sarah@example.com', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600">Welcome to PropValuer Admin Panel</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/properties">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-emerald-600 font-medium">{stat.change}</p>
                </div>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'property' ? 'bg-emerald-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/properties">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                View Properties
              </Button>
            </Link>
            <Link href="/admin/valuations">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Review Valuations
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}