import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, CheckCircle, AlertCircle, RefreshCw, 
  ArrowLeft, Clock, Shield
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function EmailVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error' | 'expired'>('pending');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get email from location state or URL params
    const stateEmail = location.state?.email;
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const emailParam = urlParams.get('email');
    
    setEmail(stateEmail || emailParam || '');

    // If there's a token in URL, attempt verification
    if (token) {
      handleTokenVerification(token);
    }

    // Start cooldown timer if needed
    const lastResend = localStorage.getItem('lastEmailResend');
    if (lastResend) {
      const timeSince = Date.now() - parseInt(lastResend);
      const remainingCooldown = Math.max(0, 60000 - timeSince); // 60 second cooldown
      if (remainingCooldown > 0) {
        setResendCooldown(Math.ceil(remainingCooldown / 1000));
      }
    }
  }, [location]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleTokenVerification = async (token: string) => {
    setLoading(true);
    
    try {
      // Simulate API call for token verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different verification outcomes
      if (token === 'valid_token') {
        setVerificationStatus('success');
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Email verified successfully! You can now sign in to your account.' 
            }
          });
        }, 3000);
      } else if (token === 'expired_token') {
        setVerificationStatus('expired');
      } else {
        setVerificationStatus('error');
      }
    } catch (error) {
      setVerificationStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email || resendCooldown > 0) return;

    setResendLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set cooldown
      localStorage.setItem('lastEmailResend', Date.now().toString());
      setResendCooldown(60);
      
      alert('Verification email sent! Please check your inbox and spam folder.');
    } catch (error) {
      alert('Failed to resend email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-16 w-16 text-red-600" />;
      case 'expired':
        return <Clock className="h-16 w-16 text-orange-600" />;
      default:
        return <Mail className="h-16 w-16 text-blue-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'success':
        return {
          title: 'Email Verified Successfully!',
          description: 'Your email has been verified. You will be redirected to the login page shortly.',
          variant: 'success' as const
        };
      case 'error':
        return {
          title: 'Verification Failed',
          description: 'The verification link is invalid or has already been used. Please request a new verification email.',
          variant: 'destructive' as const
        };
      case 'expired':
        return {
          title: 'Verification Link Expired',
          description: 'This verification link has expired. Please request a new verification email to continue.',
          variant: 'destructive' as const
        };
      default:
        return {
          title: 'Verify Your Email Address',
          description: 'We\'ve sent a verification email to your address. Please check your inbox and click the verification link.',
          variant: 'default' as const
        };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Email Verification</h1>
          <p className="text-gray-600 mt-2">Complete your account setup</p>
        </div>

        {/* Verification Card */}
        <Card>
          <CardContent className="py-8 text-center">
            <div className="mb-6">
              {loading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto" />
              ) : (
                getStatusIcon()
              )}
            </div>

            <CardTitle className="text-xl mb-2">{statusMessage.title}</CardTitle>
            <CardDescription className="mb-6">
              {statusMessage.description}
            </CardDescription>

            {email && (
              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <p className="text-sm text-gray-600">Email sent to:</p>
                <p className="font-medium">{email}</p>
              </div>
            )}

            {verificationStatus === 'pending' && (
              <Alert className="border-blue-200 bg-blue-50 mb-6">
                <Mail className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Didn't receive the email?</strong> Check your spam folder or request a new verification email below.
                </AlertDescription>
              </Alert>
            )}

            {(verificationStatus === 'error' || verificationStatus === 'expired') && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {verificationStatus === 'expired' 
                    ? 'Verification links expire after 24 hours for security reasons.'
                    : 'This could happen if the link was already used or is malformed.'
                  }
                </AlertDescription>
              </Alert>
            )}

            {verificationStatus === 'success' && (
              <Alert className="border-green-200 bg-green-50 mb-6">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Welcome to SwaedUAE!</strong> Your account is now active and ready to use.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              {(verificationStatus === 'pending' || verificationStatus === 'error' || verificationStatus === 'expired') && (
                <Button 
                  onClick={handleResendEmail}
                  disabled={resendLoading || resendCooldown > 0 || !email}
                  className="w-full"
                >
                  {resendLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : resendCooldown > 0 ? (
                    `Resend in ${resendCooldown}s`
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              )}

              {verificationStatus === 'success' ? (
                <Link to="/login">
                  <Button className="w-full">
                    Continue to Login
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 mt-0.5 text-gray-400" />
                <div>
                  <p className="font-medium">Email not arriving?</p>
                  <p>Check your spam/junk folder and add noreply@swaeduae.ae to your contacts</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5 text-gray-400" />
                <div>
                  <p className="font-medium">Verification links expire in 24 hours</p>
                  <p>For security reasons, please verify your email within 24 hours</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Still having trouble?{' '}
                <a href="mailto:support@swaeduae.ae" className="text-blue-600 hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Links */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-2">Demo Links</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p>
                <button 
                  onClick={() => handleTokenVerification('valid_token')}
                  className="text-blue-600 hover:underline"
                >
                  Simulate Successful Verification
                </button>
              </p>
              <p>
                <button 
                  onClick={() => handleTokenVerification('expired_token')}
                  className="text-blue-600 hover:underline"
                >
                  Simulate Expired Link
                </button>
              </p>
              <p>
                <button 
                  onClick={() => handleTokenVerification('invalid_token')}
                  className="text-blue-600 hover:underline"
                >
                  Simulate Invalid Link
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}