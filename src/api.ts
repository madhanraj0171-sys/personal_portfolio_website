import { ProjectItem, ContactMessage, HealthResponse } from './types';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const fallbackProjects: ProjectItem[] = [
  {
    _id: 'proj-1',
    title: 'RentWise',
    description: 'A role-based rental management application connecting tenants and landlords in one platform.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    features: [
      'Tenant and landlord login',
      'Property discovery',
      'Rental information',
      'Maintenance issue reporting',
      'Rent and maintenance payments',
      'Payment history',
      'Notifications',
      'Tenant-landlord communication',
    ],
    github: 'https://github.com/madhanrajb/rentwise',
    liveDemo: 'https://rentwise-demo.vercel.app',
    featured: true,
  },
  {
    _id: 'proj-2',
    title: 'Smart Parking Slot Management System',
    description: 'A system for managing parking slot availability and helping users identify occupied and available parking spaces.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'QR Code'],
    features: [
      'Real-time parking slot availability overview',
      'QR code scan to verify parking slot occupancy',
      'Vehicle check-in and checkout timestamps',
      'Instant slot status updates (Available vs Occupied)',
      'Responsive interface for drivers and parking attendants',
    ],
    github: 'https://github.com/madhanrajb/smart-parking-system',
    liveDemo: 'https://smart-parking-demo.vercel.app',
    featured: true,
  },
  {
    _id: 'proj-3',
    title: 'Algorithms Practice',
    description: 'A collection of programming solutions created while practicing Data Structures and Algorithms.',
    technologies: ['Java', 'C', 'Data Structures', 'Algorithms'],
    features: [
      'Searching (Linear Search, Binary Search)',
      'Sorting (Bubble, Selection, Insertion, Merge, Quick Sort)',
      'Binary Search problems and optimization techniques',
      'Greedy algorithms and problem patterns',
      'Recursion and backtracking implementations',
      'Singly and Doubly Linked Lists with utility methods',
    ],
    github: 'https://github.com/madhanrajb/algorithms-practice',
    liveDemo: 'https://github.com/madhanrajb/algorithms-practice',
    featured: true,
  },
];

export async function fetchProjects(): Promise<{ projects: ProjectItem[]; isOfflineFallback?: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const data = await res.json();
    if (data && Array.isArray(data.data) && data.data.length > 0) {
      return { projects: data.data, isOfflineFallback: false };
    }
    return { projects: fallbackProjects, isOfflineFallback: false };
  } catch (err) {
    console.warn('Backend API request failed, utilizing client fallback data:', err);
    return { projects: fallbackProjects, isOfflineFallback: true };
  }
}

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `HTTP ${res.status}: Failed to send message`);
    }

    return {
      success: true,
      message: data.message || 'Thank you! Your message has been received.',
    };
  } catch (err: any) {
    console.error('Contact submission error:', err);
    throw new Error(err.message || 'Unable to submit message. Please try again or email directly.');
  }
}

export async function checkApiHealth(): Promise<HealthResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchContactMessages(adminKey: string): Promise<ContactMessage[]> {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    headers: {
      'x-admin-key': adminKey,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.data || [];
}

export async function createProjectApi(project: Partial<ProjectItem>, adminKey: string): Promise<ProjectItem> {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey,
    },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.data;
}

export async function deleteProjectApi(id: string, adminKey: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'x-admin-key': adminKey,
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed with status ${res.status}`);
  }
}
