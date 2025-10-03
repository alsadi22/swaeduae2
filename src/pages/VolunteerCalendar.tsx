import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Filter, Download,
  Clock, MapPin, Users, Bell, Share2, Eye, Settings,
  CalendarDays, CalendarCheck, CalendarX, Repeat
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  organization: string;
  type: 'volunteer' | 'training' | 'meeting' | 'deadline' | 'reminder';
  status: 'registered' | 'confirmed' | 'completed' | 'cancelled';
  date: string;
  startTime: string;
  endTime: string;
  location: {
    name: string;
    address: string;
  };
  description: string;
  attendees: number;
  maxAttendees?: number;
  color: string;
  reminder: boolean;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    until: string;
  };
}

export default function VolunteerCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);

  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Beach Cleanup Initiative',
      organization: 'Green Initiative UAE',
      type: 'volunteer',
      status: 'confirmed',
      date: '2024-03-25',
      startTime: '08:00',
      endTime: '12:00',
      location: {
        name: 'Dubai Marina Beach',
        address: 'Dubai Marina, Dubai, UAE'
      },
      description: 'Join us for a morning beach cleanup to protect marine life and keep our beaches pristine.',
      attendees: 45,
      maxAttendees: 50,
      color: '#10B981',
      reminder: true
    },
    {
      id: '2',
      title: 'Food Distribution Drive',
      organization: 'Emirates Food Bank',
      type: 'volunteer',
      status: 'registered',
      date: '2024-03-28',
      startTime: '17:00',
      endTime: '20:00',
      location: {
        name: 'Al Karama Community Center',
        address: 'Al Karama, Dubai, UAE'
      },
      description: 'Help distribute food packages to families in need during Ramadan.',
      attendees: 32,
      maxAttendees: 40,
      color: '#F59E0B',
      reminder: true,
      recurring: {
        frequency: 'weekly',
        until: '2024-04-30'
      }
    },
    {
      id: '3',
      title: 'Volunteer Training Session',
      organization: 'SwaedUAE',
      type: 'training',
      status: 'confirmed',
      date: '2024-03-22',
      startTime: '14:00',
      endTime: '16:00',
      location: {
        name: 'SwaedUAE Training Center',
        address: 'Business Bay, Dubai, UAE'
      },
      description: 'Essential training for new volunteers covering safety protocols and best practices.',
      attendees: 25,
      maxAttendees: 30,
      color: '#3B82F6',
      reminder: true
    },
    {
      id: '4',
      title: 'Team Meeting - Environmental Projects',
      organization: 'Green Initiative UAE',
      type: 'meeting',
      status: 'confirmed',
      date: '2024-03-30',
      startTime: '10:00',
      endTime: '11:30',
      location: {
        name: 'Virtual Meeting',
        address: 'Zoom Meeting'
      },
      description: 'Monthly team meeting to discuss upcoming environmental volunteer projects.',
      attendees: 12,
      color: '#8B5CF6',
      reminder: true
    },
    {
      id: '5',
      title: 'Certificate Submission Deadline',
      organization: 'Future Leaders Foundation',
      type: 'deadline',
      status: 'registered',
      date: '2024-03-26',
      startTime: '23:59',
      endTime: '23:59',
      location: {
        name: 'Online Submission',
        address: 'SwaedUAE Portal'
      },
      description: 'Deadline to submit volunteer hours for certificate processing.',
      attendees: 1,
      color: '#EF4444',
      reminder: true
    },
    {
      id: '6',
      title: 'Children Education Workshop',
      organization: 'Future Leaders Foundation',
      type: 'volunteer',
      status: 'completed',
      date: '2024-03-20',
      startTime: '14:00',
      endTime: '17:00',
      location: {
        name: 'Sharjah Public Library',
        address: 'Sharjah, UAE'
      },
      description: 'Teaching basic English and math skills to underprivileged children.',
      attendees: 18,
      maxAttendees: 20,
      color: '#10B981',
      reminder: false
    }
  ];

  const eventTypes = [
    { id: 'all', name: 'All Events', color: '#6B7280' },
    { id: 'volunteer', name: 'Volunteer Events', color: '#10B981' },
    { id: 'training', name: 'Training', color: '#3B82F6' },
    { id: 'meeting', name: 'Meetings', color: '#8B5CF6' },
    { id: 'deadline', name: 'Deadlines', color: '#EF4444' }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => {
      const eventDate = event.date;
      const matchesDate = eventDate === date;
      const matchesFilter = selectedFilters.includes('all') || 
                           selectedFilters.includes(event.type);
      return matchesDate && matchesFilter;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  };

  const handleFilterChange = (filterId: string) => {
    if (filterId === 'all') {
      setSelectedFilters(['all']);
    } else {
      const newFilters = selectedFilters.includes(filterId)
        ? selectedFilters.filter(f => f !== filterId)
        : [...selectedFilters.filter(f => f !== 'all'), filterId];
      
      setSelectedFilters(newFilters.length === 0 ? ['all'] : newFilters);
    }
  };

  const exportCalendar = () => {
    alert('Calendar exported to ICS format!');
  };

  const syncWithExternalCalendar = () => {
    alert('Calendar sync initiated with Google Calendar!');
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <div key={day} className={`h-32 border border-gray-200 p-1 ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1 overflow-y-auto max-h-20">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                className="text-xs p-1 rounded cursor-pointer hover:opacity-80"
                style={{ backgroundColor: event.color + '20', borderLeft: `3px solid ${event.color}` }}
                onClick={() => handleEventClick(event)}
              >
                <div className="font-medium truncate">{event.title}</div>
                <div className="text-gray-600">{event.startTime}</div>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getStatusBadge = (status: CalendarEvent['status']) => {
    const statusConfig = {
      registered: { label: 'Registered', className: 'bg-blue-100 text-blue-800' },
      confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-800' },
      completed: { label: 'Completed', className: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: CalendarEvent['type']) => {
    const icons = {
      volunteer: <Users className="h-4 w-4" />,
      training: <CalendarCheck className="h-4 w-4" />,
      meeting: <CalendarDays className="h-4 w-4" />,
      deadline: <CalendarX className="h-4 w-4" />,
      reminder: <Bell className="h-4 w-4" />
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Calendar</h1>
            <p className="text-gray-600">Manage your volunteer schedule and upcoming events</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={exportCalendar}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={syncWithExternalCalendar}>
              <Share2 className="h-4 w-4 mr-2" />
              Sync Calendar
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Calendar Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <Button
                    variant={viewMode === 'month' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('month')}
                  >
                    Month
                  </Button>
                  <Button
                    variant={viewMode === 'week' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('week')}
                  >
                    Week
                  </Button>
                  <Button
                    variant={viewMode === 'day' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('day')}
                  >
                    Day
                  </Button>
                </div>
              </div>
            </div>

            {/* Event Type Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {eventTypes.map(type => (
                <Button
                  key={type.id}
                  variant={selectedFilters.includes(type.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange(type.id)}
                  className="flex items-center space-x-2"
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: type.color }}
                  ></div>
                  <span>{type.name}</span>
                </Button>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-gray-50 p-3 text-center font-medium text-gray-700 border-b border-gray-200">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {renderCalendarGrid()}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your next volunteer activities and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map(event => (
                <div key={event.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                     onClick={() => handleEventClick(event)}>
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: event.color }}
                  ></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      {getStatusBadge(event.status)}
                      {event.reminder && <Bell className="h-4 w-4 text-blue-500" />}
                      {event.recurring && <Repeat className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div className="text-sm text-gray-600">{event.organization}</div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location.name}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(event.type)}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event Detail Dialog */}
        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {selectedEvent && getTypeIcon(selectedEvent.type)}
                <span>{selectedEvent?.title}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedEvent?.organization}
              </DialogDescription>
            </DialogHeader>
            
            {selectedEvent && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {getStatusBadge(selectedEvent.status)}
                  {selectedEvent.reminder && (
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Bell className="h-3 w-3" />
                      <span>Reminder Set</span>
                    </Badge>
                  )}
                  {selectedEvent.recurring && (
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Repeat className="h-3 w-3" />
                      <span>Recurring</span>
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <div>{selectedEvent.location.name}</div>
                      <div className="text-gray-600">{selectedEvent.location.address}</div>
                    </div>
                  </div>
                  
                  {selectedEvent.maxAttendees && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{selectedEvent.attendees} / {selectedEvent.maxAttendees} attendees</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-700">{selectedEvent.description}</p>
                </div>

                {selectedEvent.recurring && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recurring Details</h4>
                    <p className="text-sm text-gray-700">
                      Repeats {selectedEvent.recurring.frequency} until {new Date(selectedEvent.recurring.until).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  {selectedEvent.status === 'registered' && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm Attendance
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Event Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Personal Event</DialogTitle>
              <DialogDescription>
                Add a personal reminder or event to your volunteer calendar
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input 
                  type="text" 
                  placeholder="Event title"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="reminder">Reminder</option>
                  <option value="deadline">Deadline</option>
                  <option value="meeting">Meeting</option>
                  <option value="training">Training</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  placeholder="Event description"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="setReminder" className="h-4 w-4" />
                <label htmlFor="setReminder" className="text-sm text-gray-700">
                  Set reminder notification
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  Add Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}