"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils"

const roles = [
  { id: 'student' as const, label: 'Student', icon: '🎓' },
  { id: 'teacher' as const, label: 'Teacher', icon: '👨‍🏫' },
  { id: 'parent' as const, label: 'Parent', icon: '👨‍👩‍👧' }
];

const departments = [
  { value: 'cs', label: 'CSE' },
  { value: 'ec', label: 'ECE' },
  { value: 'it', label: 'IT' }
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  password: string;
  confirmPassword: string;
  admissionNumber: string;
  admissionYear: string;
  candidateCode: string;
  department: string;
  dateOfBirth: string;
  relation: string;
  designation: string;
  dateOfJoining: string;
};

const FormField = ({ id, label, type = 'text', placeholder, value, error, onChange }: { id: keyof FormData; label: string; type?: string; placeholder?: string; value: string; error?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={value}
        onChange={onChange} name={id} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
  
  const SelectField = ({ id, label, value, error, options, placeholder, onValueChange }: { id: keyof FormData; label: string; value: string; error?: string; options: { value: string; label: string }[]; placeholder: string; onValueChange: (value: string) => void; }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent position="popper" sideOffset={5}>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function SignUpUserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'parent'>('student');
    const [formData, setFormData] = useState<FormData>({
      firstName: '', lastName: '', email: '', phone: '', gender: '', password: '', confirmPassword: '',
      admissionNumber: '', admissionYear: '', candidateCode: '', department: '', dateOfBirth: '',
      relation: '', designation: '', dateOfJoining: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
  
    const handleInputChange = (field: keyof FormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };
  
    const handleInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      handleInputChange(name as keyof FormData, value);
    };
  
    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.firstName.trim() || formData.firstName.length < 2) 
        newErrors.firstName = 'First name must be at least 2 characters';
      if (!formData.lastName.trim() || formData.lastName.length < 2) 
        newErrors.lastName = 'Last name must be at least 2 characters';
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
        newErrors.email = 'Invalid email address';
      if (!formData.phone.trim() || formData.phone.length < 10) 
        newErrors.phone = 'Phone number must be at least 10 digits';
      if (!formData.gender) newErrors.gender = 'Please select a gender';
      if (!formData.password || formData.password.length < 8) 
        newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword || formData.password !== formData.confirmPassword) 
        newErrors.confirmPassword = "Passwords don't match";
  
      if (selectedRole === 'student') {
        if (!formData.admissionNumber.trim()) newErrors.admissionNumber = 'Required';
        if (!formData.admissionYear.trim()) newErrors.admissionYear = 'Required';
        if (!formData.candidateCode.trim()) newErrors.candidateCode = 'Required';
        if (!formData.department) newErrors.department = 'Required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Required';
      } else if (selectedRole === 'parent') {
        if (!formData.relation) newErrors.relation = 'Required';
      } else if (selectedRole === 'teacher') {
        if (!formData.designation.trim()) newErrors.designation = 'Required';
        if (!formData.department) newErrors.department = 'Required';
        if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Required';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
        setError('Please fix the errors in the form');
        return;
      }
  
      setIsLoading(true);
      setError(null);
      try {
        console.log('Form submitted:', { ...formData, role: selectedRole });
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('Account created successfully!');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleGoogleSignUp = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Google sign-up initiated!');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred during Google sign up');
        }
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selection */}
        <div className="space-y-2">
          <Label>Select Role</Label>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <button key={role.id} type="button" onClick={() => { setSelectedRole(role.id); setErrors({}); }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  selectedRole === role.id ? 'border-white bg-secondary text-white' : 'border-gray-800 hover:border-gray-300'
                }`}>
                <span className="text-2xl mb-1">{role.icon}</span>
                <span className="text-xs font-medium">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-3">
          <FormField id="firstName" label="First Name" placeholder="John" value={formData.firstName} error={errors.firstName} onChange={handleInputEvent} />
          <FormField id="lastName" label="Last Name" placeholder="Doe" value={formData.lastName} error={errors.lastName} onChange={handleInputEvent} />
        </div>
        <FormField id="email" label="Email" type="email" placeholder="mail@example.com" value={formData.email} error={errors.email} onChange={handleInputEvent} />
        <FormField id="phone" label="Phone Number" type="tel" placeholder="+91 98765 43210" value={formData.phone} error={errors.phone} onChange={handleInputEvent} />
        <SelectField id="gender" label="Gender" value={formData.gender} error={errors.gender} placeholder="Select gender"
          options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} onValueChange={(value) => handleInputChange('gender', value)} />

        {/* Role-Specific Fields */}
        {selectedRole === 'student' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <FormField id="admissionNumber" label="Admission No." placeholder="29CSE555" value={formData.admissionNumber} error={errors.admissionNumber} onChange={handleInputEvent} />
              <FormField id="admissionYear" label="Admission Year" type="number" placeholder="2026" value={formData.admissionYear} error={errors.admissionYear} onChange={handleInputEvent} />
            </div>
            <FormField id="candidateCode" label="Candidate Code" placeholder="41529505078" value={formData.candidateCode} error={errors.candidateCode} onChange={handleInputEvent} />
            <SelectField id="department" label="Department" value={formData.department} error={errors.department} placeholder="Select department" options={departments} onValueChange={(value) => handleInputChange('department', value)} />
            <FormField id="dateOfBirth" label="Date of Birth" type="date" value={formData.dateOfBirth} error={errors.dateOfBirth} onChange={handleInputEvent} />
          </>
        )}

        {selectedRole === 'parent' && (
          <SelectField id="relation" label="Relation" value={formData.relation} error={errors.relation} placeholder="Select relation"
            options={[{ value: 'father', label: 'Father' }, { value: 'mother', label: 'Mother' }, { value: 'guardian', label: 'Guardian' }]} onValueChange={(value) => handleInputChange('relation', value)} />
        )}

        {selectedRole === 'teacher' && (
          <>
            <FormField id="designation" label="Designation" placeholder="Assistant Professor" value={formData.designation} error={errors.designation} onChange={handleInputEvent} />
            <SelectField id="department" label="Department" value={formData.department} error={errors.department} placeholder="Select department"
              options={[{ value: 'cs', label: 'Computer Science' }, { value: 'ec', label: 'Electronics' }, { value: 'me', label: 'Mechanical' }, { value: 'ce', label: 'Civil' }]} onValueChange={(value) => handleInputChange('department', value)} />
            <FormField id="dateOfJoining" label="Date of Joining" type="date" value={formData.dateOfJoining} error={errors.dateOfJoining} onChange={handleInputEvent} />
          </>
        )}

        <FormField id="password" label="Password" type="password" placeholder="••••••••" value={formData.password} error={errors.password} onChange={handleInputEvent} />
        <FormField id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" value={formData.confirmPassword} error={errors.confirmPassword} onChange={handleInputEvent} />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!isLoading && "Create Account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-400" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleSignUp} className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <React.Fragment>
            <svg key="google-icon" className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            <span key="google-text">Google</span>
          </React.Fragment>
        )}
      </Button>
    </div>
  )
}
