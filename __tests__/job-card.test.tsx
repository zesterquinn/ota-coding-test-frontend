/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import JobCard from '@/app/job-listings/_components/job-card';
import { Job } from '@/types/job';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('JobCard', () => {
  const mockJob: Job = {
    id: 1,
    name: 'Software Engineer',
    subcompany: 'Tech Corp',
    employmentType: 'FULL_TIME',
    schedule: 'Full-time',
    office: 'San Francisco',
    department: 'Engineering',
    jobDescriptions: [
      {
        name: 'Description',
        value: '<p>We are looking for a talented software engineer to join our team.</p>',
      },
    ],
    createdAt: '2024-01-01',
    occupation: 'Software Development',
    occupationCategory: 'IT',
    recruitingCategory: 'Engineering',
    seniority: 'Mid-level',
    yearsOfExperience: '3-5',
    isPending: false,
    isSpam: false,
    isApproved: true,
  };

  it('renders job card with all information', () => {
    render(<JobCard job={mockJob} />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText(/We are looking for a talented software engineer/i)).toBeInTheDocument();
    expect(screen.getByText('FULL TIME')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('renders link with correct href', () => {
    render(<JobCard job={mockJob} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/job-listings/1');
  });

  it('formats employment type correctly (underscore to space)', () => {
    const jobWithUnderscore: Job = {
      ...mockJob,
      employmentType: 'PART_TIME',
    };

    render(<JobCard job={jobWithUnderscore} />);

    expect(screen.getByText('PART TIME')).toBeInTheDocument();
  });

  it('handles multiple underscores in employment type', () => {
    const jobWithMultipleUnderscores: Job = {
      ...mockJob,
      employmentType: 'CONTRACT_TO_HIRE',
    };

    render(<JobCard job={jobWithMultipleUnderscores} />);

    expect(screen.getByText('CONTRACT TO HIRE')).toBeInTheDocument();
  });

  it('displays "N/A" when job description is missing', () => {
    const jobWithoutDescription: Job = {
      ...mockJob,
      jobDescriptions: [],
    };

    render(<JobCard job={jobWithoutDescription} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('displays "N/A" when job description value is empty', () => {
    const jobWithEmptyDescription: Job = {
      ...mockJob,
      jobDescriptions: [
        {
          name: 'Description',
          value: '',
        },
      ],
    };

    render(<JobCard job={jobWithEmptyDescription} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders HTML content in job description', () => {
    const jobWithHtml: Job = {
      ...mockJob,
      jobDescriptions: [
        {
          name: 'Description',
          value: '<p>HTML <strong>content</strong> here</p>',
        },
      ],
    };

    render(<JobCard job={jobWithHtml} />);

    expect(screen.getByText(/HTML/i)).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();
    expect(screen.getByText(/here/i)).toBeInTheDocument();
  });

  it('handles different job IDs correctly', () => {
    const jobWithDifferentId: Job = {
      ...mockJob,
      id: 999,
    };

    render(<JobCard job={jobWithDifferentId} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/job-listings/999');
  });

  it('renders all badge elements', () => {
    render(<JobCard job={mockJob} />);

    expect(screen.getByText('FULL TIME')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });
});

