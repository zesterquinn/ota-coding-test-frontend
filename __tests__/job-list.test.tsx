/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { Job } from '@/types/job';

jest.mock('../src/app/job-listings/_components/job-card', () => {
  return function MockJobCard({ job }: { job: Job }) {
    return <div data-testid={`job-card-${job.id}`}>{job.name}</div>;
  };
});

import JobList from '@/app/job-listings/_components/job-list';

global.fetch = jest.fn();

describe('JobList', () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv;
  });

  const mockJob1: Job = {
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
        value: '<p>Job description 1</p>',
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

  const mockJob2: Job = {
    id: 2,
    name: 'Product Manager',
    subcompany: 'Product Inc',
    employmentType: 'PART_TIME',
    schedule: 'Part-time',
    office: 'New York',
    department: 'Product',
    jobDescriptions: [
      {
        name: 'Description',
        value: '<p>Job description 2</p>',
      },
    ],
    createdAt: '2024-01-02',
    occupation: 'Product Management',
    occupationCategory: 'Product',
    recruitingCategory: 'Product',
    seniority: 'Senior',
    yearsOfExperience: '5-7',
    isPending: false,
    isSpam: false,
    isApproved: true,
  };

  const mockJob3: Job = {
    id: 3,
    name: 'Designer',
    subcompany: 'Design Co',
    employmentType: 'CONTRACT',
    schedule: 'Contract',
    office: 'Remote',
    department: 'Design',
    jobDescriptions: [
      {
        name: 'Description',
        value: '<p>Job description 3</p>',
      },
    ],
    createdAt: '2024-01-03',
    occupation: 'Design',
    occupationCategory: 'Design',
    recruitingCategory: 'Design',
    seniority: 'Junior',
    yearsOfExperience: '1-3',
    isPending: false,
    isSpam: false,
    isApproved: true,
  };

  it('renders jobs from API response', async () => {
    const mockData = {
      jobs: [mockJob1, mockJob2],
      cachedExternalJobs: [],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    const component = await JobList();
    render(component);

    expect(screen.getByTestId('job-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('job-card-2')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });

  it('combines jobs and cachedExternalJobs', async () => {
    const mockData = {
      jobs: [mockJob1],
      cachedExternalJobs: [mockJob2, mockJob3],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    const component = await JobList();
    render(component);

    expect(screen.getByTestId('job-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('job-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('job-card-3')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('renders empty list when no jobs are available', async () => {
    const mockData = {
      jobs: [],
      cachedExternalJobs: [],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    const component = await JobList();
    render(component);

    expect(screen.queryByTestId(/job-card-/)).not.toBeInTheDocument();
  });

  it('fetches from correct API URL', async () => {
    const mockData = {
      jobs: [mockJob1],
      cachedExternalJobs: [],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    await JobList();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/jobs',
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      })
    );
  });

  it('uses AbortController signal in fetch', async () => {
    const mockData = {
      jobs: [mockJob1],
      cachedExternalJobs: [],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    await JobList();

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
    expect(fetchCall[1].signal).toBeInstanceOf(AbortSignal);
  });

  it('renders only cachedExternalJobs when jobs array is empty', async () => {
    const mockData = {
      jobs: [],
      cachedExternalJobs: [mockJob1, mockJob2],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    const component = await JobList();
    render(component);

    expect(screen.getByTestId('job-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('job-card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('job-card-3')).not.toBeInTheDocument();
  });

  it('renders only jobs when cachedExternalJobs array is empty', async () => {
    const mockData = {
      jobs: [mockJob1, mockJob2],
      cachedExternalJobs: [],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    const component = await JobList();
    render(component);

    expect(screen.getByTestId('job-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('job-card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('job-card-3')).not.toBeInTheDocument();
  });

  it('renders grid container with correct classes', async () => {
    const mockData = {
      jobs: [mockJob1],
      cachedExternalJobs: [],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    const component = await JobList();
    const { container } = render(component);

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid', 'md:grid-cols-2', 'lg:grid-cols-3', 'grid-cols-1', 'gap-4');
  });

  it('handles API response with missing jobs property', async () => {
    const mockData = {
      cachedExternalJobs: [mockJob1],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    await expect(JobList()).rejects.toThrow();
  });

  it('handles API response with missing cachedExternalJobs property', async () => {
    const mockData = {
      jobs: [mockJob1],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    await expect(JobList()).rejects.toThrow();
  });
});

