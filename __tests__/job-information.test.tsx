/// <reference types="@testing-library/jest-dom" />
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Job } from '@/types/job';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useParams: jest.fn(() => ({ jobId: '1' })),
}));

jest.mock('../src/app/_components/job-details', () => ({
  JobDetails: ({ job }: { job: Job }) => <div data-testid="job-details">{job.name}</div>,
  JobSubHeader: ({ job }: { job: Job }) => <div data-testid="job-sub-header">{job.subcompany}</div>,
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

import JobInformation from '@/app/manage-jobs/_components/job-information';

global.fetch = jest.fn();

describe('JobInformation', () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv;
  });

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
        value: '<p>Job description</p>',
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

  it('renders job name and status', () => {
    render(<JobInformation job={mockJob} />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('displays Approved status with green color when job is approved', () => {
    const approvedJob: Job = {
      ...mockJob,
      isPending: false,
      isApproved: true,
      isSpam: false,
    };

    render(<JobInformation job={approvedJob} />);

    const statusElement = screen.getByText('Approved');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('text-green-500');
  });

  it('displays Spam status with red color when job is spam', () => {
    const spamJob: Job = {
      ...mockJob,
      isPending: false,
      isApproved: false,
      isSpam: true,
    };

    render(<JobInformation job={spamJob} />);

    const statusElement = screen.getByText('Spam');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('text-red-500');
  });

  it('displays Pending status with yellow color when job is pending', () => {
    const pendingJob: Job = {
      ...mockJob,
      isPending: true,
      isApproved: false,
      isSpam: false,
    };

    render(<JobInformation job={pendingJob} />);

    const statusElement = screen.getByText('Pending');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass('text-yellow-500');
  });

  it('renders Approve and Mark as Spam buttons', () => {
    render(<JobInformation job={mockJob} />);

    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mark as Spam' })).toBeInTheDocument();
  });

  it('calls approve API and redirects when Approve button is clicked', async () => {
    const { redirect } = require('next/navigation');

    render(<JobInformation job={mockJob} />);

    const approveButton = screen.getByRole('button', { name: 'Approve' });
    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/jobs/1/approve',
        expect.objectContaining({
          method: 'put',
          signal: expect.any(AbortSignal),
        })
      );
    });

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/manage-jobs');
    });
  });

  it('calls mark-as-spam API and redirects when Mark as Spam button is clicked', async () => {
    const { redirect } = require('next/navigation');

    render(<JobInformation job={mockJob} />);

    const spamButton = screen.getByRole('button', { name: 'Mark as Spam' });
    fireEvent.click(spamButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/jobs/1/mark-as-spam',
        expect.objectContaining({
          method: 'put',
          signal: expect.any(AbortSignal),
        })
      );
    });

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/manage-jobs');
    });
  });

  it('uses AbortController signal in approve API call', async () => {
    render(<JobInformation job={mockJob} />);

    const approveButton = screen.getByRole('button', { name: 'Approve' });
    fireEvent.click(approveButton);

    await waitFor(() => {
      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      expect(fetchCall[1].signal).toBeInstanceOf(AbortSignal);
    });
  });

  it('uses AbortController signal in mark-as-spam API call', async () => {
    render(<JobInformation job={mockJob} />);

    const spamButton = screen.getByRole('button', { name: 'Mark as Spam' });
    fireEvent.click(spamButton);

    await waitFor(() => {
      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      expect(fetchCall[1].signal).toBeInstanceOf(AbortSignal);
    });
  });

  it('renders JobSubHeader component', () => {
    render(<JobInformation job={mockJob} />);

    expect(screen.getByTestId('job-sub-header')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('renders JobDetails component', () => {
    render(<JobInformation job={mockJob} />);

    expect(screen.getByTestId('job-details')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('displays empty status when job does not match any status condition', () => {
    const unknownStatusJob: Job = {
      ...mockJob,
      isPending: false,
      isApproved: false,
      isSpam: false,
    };

    render(<JobInformation job={unknownStatusJob} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(screen.queryByText('Approved')).not.toBeInTheDocument();
    expect(screen.queryByText('Spam')).not.toBeInTheDocument();
    expect(screen.queryByText('Pending')).not.toBeInTheDocument();
  });

  it('handles job with null/undefined name gracefully', () => {
    const jobWithNullName: Job = {
      ...mockJob,
      name: '',
    };

    render(<JobInformation job={jobWithNullName} />);

    expect(screen.getByText('Approved')).toBeInTheDocument();
  });
});

