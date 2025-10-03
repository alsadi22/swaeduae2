import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, Mail, Plus, MoreHorizontal, Shield, 
  Crown, UserCheck, UserX, Clock, Send,
  AlertCircle, CheckCircle, Edit, Trash2
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'staff';
  status: 'active' | 'pending' | 'suspended';
  joinDate: string;
  lastActive: string;
  avatar?: string;
  permissions: string[];
}

interface Invitation {
  id: string;
  email: string;
  role: 'admin' | 'staff';
  invitedBy: string;
  invitedAt: string;
  status: 'pending' | 'accepted' | 'expired';
  expiresAt: string;
}

export default function OrgTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed@dubaicommunityfoundation.org',
      role: 'owner',
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: '2024-03-21T10:30:00Z',
      avatar: '/api/placeholder/40/40',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      email: 'fatima@dubaicommunityfoundation.org',
      role: 'admin',
      status: 'active',
      joinDate: '2023-03-20',
      lastActive: '2024-03-21T09:15:00Z',
      avatar: '/api/placeholder/40/40',
      permissions: ['events', 'volunteers', 'reports']
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed@dubaicommunityfoundation.org',
      role: 'staff',
      status: 'active',
      joinDate: '2023-06-10',
      lastActive: '2024-03-20T16:45:00Z',
      permissions: ['events', 'volunteers']
    },
    {
      id: '4',
      name: 'Sarah Ahmed',
      email: 'sarah@dubaicommunityfoundation.org',
      role: 'staff',
      status: 'pending',
      joinDate: '2024-03-15',
      lastActive: '',
      permissions: ['events']
    }
  ]);

  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      email: 'newstaff@example.com',
      role: 'staff',
      invitedBy: 'Ahmed Al-Mansouri',
      invitedAt: '2024-03-20T14:30:00Z',
      status: 'pending',
      expiresAt: '2024-03-27T14:30:00Z'
    },
    {
      id: '2',
      email: 'admin@example.com',
      role: 'admin',
      invitedBy: 'Ahmed Al-Mansouri',
      invitedAt: '2024-03-18T10:00:00Z',
      status: 'expired',
      expiresAt: '2024-03-25T10:00:00Z'
    }
  ]);

  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'staff' as 'admin' | 'staff',
    permissions: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const availablePermissions = [
    { id: 'events', label: 'Event Management', description: 'Create, edit, and manage events' },
    { id: 'volunteers', label: 'Volunteer Management', description: 'View and manage volunteer registrations' },
    { id: 'approvals', label: 'Hours Approval', description: 'Approve or reject volunteer hours' },
    { id: 'certificates', label: 'Certificate Management', description: 'Issue and manage certificates' },
    { id: 'reports', label: 'Reports & Analytics', description: 'Access reports and analytics' },
    { id: 'team', label: 'Team Management', description: 'Manage team members and permissions' },
    { id: 'settings', label: 'Organization Settings', description: 'Modify organization settings' }
  ];

  const getRoleBadge = (role: TeamMember['role']) => {
    const roleConfig = {
      owner: { label: 'Owner', icon: Crown, className: 'bg-purple-100 text-purple-800' },
      admin: { label: 'Admin', icon: Shield, className: 'bg-blue-100 text-blue-800' },
      staff: { label: 'Staff', icon: UserCheck, className: 'bg-green-100 text-green-800' }
    };
    
    const config = roleConfig[role];
    const Icon = config.icon;
    
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: TeamMember['status']) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      suspended: { label: 'Suspended', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleInvite = async () => {
    if (!inviteForm.email || !inviteForm.role) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newInvitation: Invitation = {
        id: Date.now().toString(),
        email: inviteForm.email,
        role: inviteForm.role,
        invitedBy: 'Ahmed Al-Mansouri',
        invitedAt: new Date().toISOString(),
        status: 'pending',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      setInvitations(prev => [newInvitation, ...prev]);
      setInviteForm({ email: '', role: 'staff', permissions: [] });
      setShowInviteDialog(false);
      
      alert('Invitation sent successfully!');
    } catch (error) {
      alert('Failed to send invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendInvitation = async (invitationId: string) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setInvitations(prev => prev.map(inv => 
        inv.id === invitationId 
          ? { ...inv, status: 'pending' as const, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }
          : inv
      ));
      
      alert('Invitation resent successfully!');
    } catch (error) {
      alert('Failed to resend invitation.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeInvitation = (invitationId: string) => {
    if (confirm('Are you sure you want to revoke this invitation?')) {
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
      alert('Invitation revoked successfully.');
    }
  };

  const handleUpdateMemberRole = async (memberId: string, newRole: 'admin' | 'staff') => {
    if (confirm(`Are you sure you want to change this member's role to ${newRole}?`)) {
      setTeamMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, role: newRole }
          : member
      ));
      alert('Member role updated successfully.');
    }
  };

  const handleSuspendMember = (memberId: string) => {
    if (confirm('Are you sure you want to suspend this team member?')) {
      setTeamMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, status: 'suspended' as const }
          : member
      ));
      alert('Team member suspended.');
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this team member? This action cannot be undone.')) {
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      alert('Team member removed.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isInvitationExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600">Manage your organization's team members and permissions</p>
          </div>
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your organization team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="colleague@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteForm.role} onValueChange={(value: 'admin' | 'staff') => setInviteForm(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin - Full management access</SelectItem>
                      <SelectItem value="staff">Staff - Limited access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={inviteForm.permissions.includes(permission.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setInviteForm(prev => ({
                              ...prev,
                              permissions: checked 
                                ? [...prev.permissions, permission.id]
                                : prev.permissions.filter(p => p !== permission.id)
                            }));
                          }}
                          className="rounded"
                        />
                        <Label htmlFor={permission.id} className="text-sm">
                          {permission.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInvite} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Invitation'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{teamMembers.length}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {teamMembers.filter(m => m.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Send className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {invitations.filter(i => i.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending Invites</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage roles and permissions for your team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n.charAt(0)).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{member.name}</h4>
                        {getRoleBadge(member.role)}
                        {getStatusBadge(member.status)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>Joined: {formatDate(member.joinDate)}</span>
                          <span>Last active: {formatDateTime(member.lastActive)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {member.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission === 'all' ? 'All Permissions' : permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {member.role !== 'owner' && (
                    <div className="flex items-center space-x-2">
                      <Select
                        value={member.role}
                        onValueChange={(value: 'admin' | 'staff') => handleUpdateMemberRole(member.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      {member.status === 'active' ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSuspendMember(member.id)}
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      ) : null}
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Invitations */}
        {invitations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Manage sent invitations and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{invitation.email}</span>
                        {getRoleBadge(invitation.role)}
                        <Badge className={
                          invitation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          invitation.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {invitation.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Invited by {invitation.invitedBy} on {formatDate(invitation.invitedAt)}</p>
                        <p>
                          {invitation.status === 'pending' && !isInvitationExpired(invitation.expiresAt) && 
                            `Expires on ${formatDate(invitation.expiresAt)}`
                          }
                          {invitation.status === 'pending' && isInvitationExpired(invitation.expiresAt) && 
                            'Expired'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {invitation.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResendInvitation(invitation.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Resend
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRevokeInvitation(invitation.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Role Permissions Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions Guide</CardTitle>
            <CardDescription>
              Understanding different role permissions in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium">Owner</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full access to all features</li>
                  <li>• Manage team members and roles</li>
                  <li>• Organization settings</li>
                  <li>• Billing and subscription</li>
                  <li>• Delete organization</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium">Admin</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Manage events and volunteers</li>
                  <li>• Approve volunteer hours</li>
                  <li>• Issue certificates</li>
                  <li>• Access reports and analytics</li>
                  <li>• Manage staff members</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium">Staff</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Create and manage events</li>
                  <li>• View volunteer registrations</li>
                  <li>• Basic reporting access</li>
                  <li>• Limited permissions</li>
                  <li>• Cannot manage team</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}