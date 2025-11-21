"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Eye, Download, CircleCheck as CheckCircle, Clock, CircleAlert as AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function ValuationsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const valuations = [
    {
      id: 'VAL001',
      property: 'Luxury Apartment in Bandra West',
      location: 'Bandra West, Mumbai',
      requestedBy: 'John Doe',
      requestDate: '2024-01-15',
      status: 'Completed',
      estimatedValue: '₹2.5 Cr',
      confidence: '95%'
    },
    {
      id: 'VAL002',
      property: 'Modern Villa in Whitefield',
      location: 'Whitefield, Bangalore',
      requestedBy: 'Sarah Smith',
      requestDate: '2024-01-14',
      status: 'In Progress',
      estimatedValue: '₹1.8 Cr',
      confidence: '88%'
    },
    {
      id: 'VAL003',
      property: 'Premium Flat in Cyber City',
      location: 'Gurgaon, Delhi NCR',
      requestedBy: 'Mike Johnson',
      requestDate: '2024-01-13',
      status: 'Pending Review',
      estimatedValue: '₹1.2 Cr',
      confidence: '92%'
    },
    {
      id: 'VAL004',
      property: 'Spacious House in Jubilee Hills',
      location: 'Jubilee Hills, Hyderabad',
      requestedBy: 'Emily Davis',
      requestDate: '2024-01-12',
      status: 'Completed',
      estimatedValue: '₹95 L',
      confidence: '90%'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'Pending Review':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Pending Review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Valuations</h1>
          <p className="text-slate-600">Manage property valuation requests and reports</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Download className="h-4 w-4 mr-2" />
          Export Reports
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Total Valuations</p>
                <p className="text-xl font-bold">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-slate-600">Completed</p>
                <p className="text-xl font-bold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-slate-600">In Progress</p>
                <p className="text-xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600">Pending Review</p>
                <p className="text-xl font-bold">66</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Valuations List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Valuations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search valuations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>

          <div className="space-y-4">
            {valuations.map((valuation) => (
              <div key={valuation.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                    {valuation.id.slice(-2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{valuation.property}</h3>
                    <p className="text-sm text-slate-600">{valuation.location}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500">By: {valuation.requestedBy}</span>
                      <span className="text-xs text-slate-500">Date: {valuation.requestDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{valuation.estimatedValue}</p>
                    <p className="text-sm text-slate-600">Confidence: {valuation.confidence}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(valuation.status)}
                    <Badge className={getStatusColor(valuation.status)}>
                      {valuation.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}