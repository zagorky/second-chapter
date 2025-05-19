import type { Dayjs } from 'dayjs';
import type { Path, FieldValues } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormField, FormItem, FormLabel, FormControl } from '~components/ui/form/form';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';

import { cn } from '~/lib/utilities';

type DatePickerFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  className?: string;
};

export const StyledDatePicker = <T extends FieldValues>({
  name,
  label = 'Date of birth',
  className,
}: DatePickerFieldProps<T>) => {
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
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    value={value}
                    onChange={(date) => {
                      field.onChange(date?.isValid() ? date.toISOString() : null);
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
                      '& .MuiDateCalendar-root': {
                        color: '#f8bbd0',
                        borderRadius: '2px',
                        borderWidth: '1px',
                        borderColor: '#e91e63',
                        border: '1px solid',
                        backgroundColor: '#880e4f',
                      },
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
