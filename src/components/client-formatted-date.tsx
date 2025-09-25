'use client';

import * as React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

interface ClientFormattedDateProps {
    timestamp: string;
    formatType?: 'distance' | 'full';
}

export const ClientFormattedDate = ({ timestamp, formatType = 'full' }: ClientFormattedDateProps) => {
    const [formattedDate, setFormattedDate] = React.useState('');
  
    React.useEffect(() => {
        const date = new Date(timestamp);
        if (formatType === 'distance') {
            setFormattedDate(formatDistanceToNow(date, { addSuffix: true }));
        } else {
            setFormattedDate(format(date, 'PPpp'));
        }
    }, [timestamp, formatType]);
  
    return <>{formattedDate}</>;
};
