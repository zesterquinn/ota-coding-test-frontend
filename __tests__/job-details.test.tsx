/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { JobSubHeader, JobDetails } from '@/app/_components/job-details';
import { Job } from '@/types/job';

describe('JobSubHeader', () => {
  const mockJob: Job = {
    id: 1,
    name: 'Software Engineer',
    subcompany: 'Tech Corp',
    employmentType: 'FULL_TIME',
    schedule: 'Full-time',
    office: 'San Francisco',
    department: 'Engineering',
    jobDescriptions: [],
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

  it('renders employmentType, schedule, office, and subcompany', () => {
    render(<JobSubHeader job={mockJob} />);

    expect(screen.getByText('FULL TIME')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('formats employmentType by replacing underscores with spaces', () => {
    const jobWithUnderscore: Job = {
      ...mockJob,
      employmentType: 'PART_TIME',
    };

    render(<JobSubHeader job={jobWithUnderscore} />);

    expect(screen.getByText('PART TIME')).toBeInTheDocument();
  });

  it('formats employmentType with multiple underscores', () => {
    const jobWithMultipleUnderscores: Job = {
      ...mockJob,
      employmentType: 'CONTRACT_TO_HIRE',
    };

    render(<JobSubHeader job={jobWithMultipleUnderscores} />);

    expect(screen.getByText('CONTRACT TO HIRE')).toBeInTheDocument();
  });

  it('displays separators between employmentType, schedule, and office', () => {
    render(<JobSubHeader job={mockJob} />);

    const separators = screen.getAllByText('|');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('displays "N/A" when employmentType is missing', () => {
    const jobWithoutEmploymentType: Job = {
      ...mockJob,
      employmentType: '',
    };

    render(<JobSubHeader job={jobWithoutEmploymentType} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('displays "N/A" when schedule is missing', () => {
    const jobWithoutSchedule: Job = {
      ...mockJob,
      schedule: '',
    };

    render(<JobSubHeader job={jobWithoutSchedule} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('displays "N/A" when office is missing', () => {
    const jobWithoutOffice: Job = {
      ...mockJob,
      office: '',
    };

    render(<JobSubHeader job={jobWithoutOffice} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('handles null values gracefully', () => {
    const jobWithNulls: Job = {
      ...mockJob,
      employmentType: null as any,
      schedule: null as any,
      office: null as any,
    };

    render(<JobSubHeader job={jobWithNulls} />);

    expect(screen.getAllByText('N/A').length).toBeGreaterThanOrEqual(3);
  });

  it('renders subcompany without formatting', () => {
    render(<JobSubHeader job={mockJob} />);

    const subcompany = screen.getByText('Tech Corp');
    expect(subcompany).toBeInTheDocument();
    expect(subcompany).toHaveClass('font-semibold');
  });
});

describe('JobDetails', () => {
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
        name: 'Job Description',
        value: '<p>We are looking for a talented software engineer.</p>',
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

  it('renders job description name and value', () => {
    render(<JobDetails job={mockJob} />);

    expect(screen.getByText('Job Description')).toBeInTheDocument();
    expect(screen.getByText(/We are looking for a talented software engineer/i)).toBeInTheDocument();
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

    render(<JobDetails job={jobWithHtml} />);

    expect(screen.getByText(/HTML/i)).toBeInTheDocument();
    expect(screen.getByText(/content/i)).toBeInTheDocument();
    expect(screen.getByText(/here/i)).toBeInTheDocument();
  });

  it('renders multiple job descriptions', () => {
    const jobWithMultipleDescriptions: Job = {
      ...mockJob,
      jobDescriptions: [
        {
          name: 'Description 1',
          value: '<p>First description</p>',
        },
        {
          name: 'Description 2',
          value: '<p>Second description</p>',
        },
        {
          name: 'Description 3',
          value: '<p>Third description</p>',
        },
      ],
    };

    render(<JobDetails job={jobWithMultipleDescriptions} />);

    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Description 3')).toBeInTheDocument();
    expect(screen.getByText(/First description/i)).toBeInTheDocument();
    expect(screen.getByText(/Second description/i)).toBeInTheDocument();
    expect(screen.getByText(/Third description/i)).toBeInTheDocument();
  });

  it('renders empty container when jobDescriptions is empty', () => {
    const jobWithoutDescriptions: Job = {
      ...mockJob,
      jobDescriptions: [],
    };

    const { container } = render(<JobDetails job={jobWithoutDescriptions} />);

    expect(container.querySelector('.job-description')).not.toBeInTheDocument();
    expect(screen.queryByText('Job Description')).not.toBeInTheDocument();
  });

  it('handles job with null jobDescriptions', () => {
    const jobWithNullDescriptions: Job = {
      ...mockJob,
      jobDescriptions: null as any,
    };

    const { container } = render(<JobDetails job={jobWithNullDescriptions} />);

    expect(container.querySelector('.job-description')).not.toBeInTheDocument();
  });

  it('renders description with correct CSS classes', () => {
    render(<JobDetails job={mockJob} />);

    const heading = screen.getByText('Job Description');
    expect(heading).toHaveClass('text-lg', 'font-extrabold', 'mb-2');

    const descriptionDiv = document.querySelector('.job-description');
    expect(descriptionDiv).toBeInTheDocument();
  });

  it('renders each description in a separate container with padding', () => {
    const jobWithMultipleDescriptions: Job = {
      ...mockJob,
      jobDescriptions: [
        {
          name: 'Description 1',
          value: '<p>First</p>',
        },
        {
          name: 'Description 2',
          value: '<p>Second</p>',
        },
      ],
    };

    const { container } = render(<JobDetails job={jobWithMultipleDescriptions} />);

    const descriptionContainers = container.querySelectorAll('.pb-10');
    expect(descriptionContainers.length).toBe(2);
  });

  it('handles description with empty value', () => {
    const jobWithEmptyValue: Job = {
      ...mockJob,
      jobDescriptions: [
        {
          name: 'Empty Description',
          value: '',
        },
      ],
    };

    render(<JobDetails job={jobWithEmptyValue} />);

    expect(screen.getByText('Empty Description')).toBeInTheDocument();
    const descriptionDiv = document.querySelector('.job-description');
    expect(descriptionDiv).toBeInTheDocument();
    expect(descriptionDiv?.textContent).toBe('');
  });

  it('handles description with empty name', () => {
    const jobWithEmptyName: Job = {
      ...mockJob,
      jobDescriptions: [
        {
          name: '',
          value: '<p>Content without name</p>',
        },
      ],
    };

    render(<JobDetails job={jobWithEmptyName} />);

    expect(screen.getByText(/Content without name/i)).toBeInTheDocument();
  });
});

