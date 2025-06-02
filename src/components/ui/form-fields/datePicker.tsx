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
  isReadOnly?: boolean;
};

export const StyledDatePicker = <T extends FieldValues>({
  name,
  label = 'Date of birth',
  className,
  isReadOnly = false,
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
              <FormLabel htmlFor={name} className="text-left">
                {label}
              </FormLabel>
              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    disabled={isReadOnly}
                    value={value}
                    onChange={(date) => {
                      field.onChange(date?.isValid() ? date.toISOString() : '');
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
                          sx: {
                            '&.Mui-disabled': {
                              border: 'none',
                              '& span': {
                                color: 'var(--color-foreground)',
                              },
                            },
                          },
                          classes: {
                            root: cn(
                              'rounded-base border-border bg-secondary-background selection:bg-main selection:text-main-foreground font-base text-foreground file:font-heading placeholder:text-foreground/50 flex h-10 w-full border-2 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm disabled:cursor-not-allowed disabled:opacity-50',
                              'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden',
                              className
                            ),
                          },
                        },
                      },

                      popper: {
                        sx: {
                          '& .MuiPaper-root': {
                            backgroundColor: 'var(--color-main)',
                            boxShadow: 'var(--shadow-shadow)',
                            borderWidth: '2px',
                            borderColor: 'var(--border)',
                            fontFamily: 'var(--font-base)',
                          },
                          '& .MuiPickersDay-root': {
                            color: 'var(--color-foreground)',
                            fontFamily: 'var(--font-base)',
                            fontWeight: 'var(--font-weight-base)',
                          },
                          '& .Mui-selected': {
                            backgroundColor: 'var(--color-foreground)',
                            borderRadius: 'var(--radius-base)',
                            color: 'var(--color-background)',
                          },
                          '& .MuiPickersCalendarHeader-label': {
                            color: 'var(--color-foreground)',
                          },
                          '& .MuiPickersDay-dayWithMargin': {
                            borderRadius: 'var(--radius-base)',
                          },
                          '& .MuiPickersDay-today': {
                            borderWidth: '2px',
                            borderColor: 'var(--color-background)',
                            backgroundColor: 'var(--color-foreground)',
                            borderRadius: 'var(--radius-base)',
                            color: 'var(--color-background)',
                            fontWeight: '700',
                          },
                        },
                      },
                    }}
                    sx={{
                      '& .MuiPickersSectionList-sectionContent[aria-valuetext="Empty"]': {
                        color: 'var(--color-foreground)',
                        opacity: 0.5,
                      },
                      '& .MuiPickersSectionList-sectionContent': {
                        color: 'var(--color-foreground)',
                      },
                      '& .MuiPickersInputBase-sectionAfter': {
                        color: 'var(--color-foreground)',
                        opacity: 0.5,
                      },
                      '& .MuiSvgIcon-root': {
                        fill: 'var(--color-foreground)',
                      },
                      '& .Mui-disabled *': {
                        border: 'none',
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
