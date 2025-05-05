import { format } from 'date-fns';
import * as React from 'react';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button/button';
import { Calendar } from '~/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utilities';

import { AddressForm } from './addressForm';

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input id="confirmPassword" type="password" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="firstName">First Name</Label>
                </div>
                <Input id="firstName" type="text" placeholder="John" required />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="lastName">Last Name</Label>
                </div>
                <Input id="lastName" type="text" placeholder="Doe" required />
              </div>

              <div className="grid gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="font-base w-[280px] justify-start text-left">
                      {date ? format(date, 'PPP') : <span>Date of birth</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-0! p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <AddressForm className="text-left" title="Shipping Address" />
              <AddressForm className="text-left" title="Billing Address" />

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/signup" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
