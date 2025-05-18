import type { Dayjs } from 'dayjs';

import { FormControl, FormLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormField, FormItem } from '~components/ui/form/form';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';

import { cn } from '~/lib/utilities';

type DatePickerFieldProps = {
  name?: string;
  label?: string;
  className?: string;
};

export const StyledDatePicker = ({
  name = 'dateOfBirth',
  label = 'Date of birth',
  className,
}: DatePickerFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const value: Dayjs | null = field.value ? dayjs(field.value) : null;

        return (
          <FormItem>
            <div className="grid gap-3">
              <FormLabel
                htmlFor={name}
                className="text-left text-sm peer-disabled:opacity-70"
                sx={{ color: 'var(--card-foreground)', fontSize: '0.875rem', textAlign: 'left' }}
              >
                {label}
              </FormLabel>
              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    value={value}
                    onChange={(date) => {
                      field.onChange(date ? date.toISOString() : null);
                    }}
                    disableFuture
                    slotProps={{
                      textField: {
                        id: name,
                        error: !!fieldState.error,
                        className,
                        fullWidth: true,
                        variant: 'outlined',
                        InputProps: {
                          className: cn(
                            'dark:bg-input/30 border-input bg-transparent text-base px-3 py-1 rounded-md border shadow-xs h-9 w-full outline-none',
                            'placeholder:text-muted text-foreground',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            className
                          ),
                        },
                      },
                    }}
                    sx={{
                      '& .MuiPickersSectionList-sectionContent[aria-valuetext="Empty"]': {
                        color: 'var(--muted-foreground)',
                      },
                      '& .MuiPickersSectionList-sectionContent': {
                        color: 'var(--foreground)',
                      },
                      '& .MuiPickersInputBase-sectionAfter': {
                        color: 'var(--muted-foreground)',
                      },
                      '& .MuiPickersSectionList-root': {
                        opacity: 1,
                      },
                      '& .MuiSvgIcon-root': {
                        fill: 'var(--muted-foreground)',
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
              <FixedFormErrorMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
};
