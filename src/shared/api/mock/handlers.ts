// shared/api/mock/handlers.ts
import { http, HttpResponse } from 'msw';

const dashboards = [
  { id: '1', title: 'Sales Dashboard' },
  { id: '2', title: 'Marketing Dashboard' },
  { id: '3', title: 'Finance Dashboard' },
];

export const handlers = [
  http.get('/dashboards', () => {
    return HttpResponse.json(dashboards);
  }),

  http.post('/dashboards', async ({ request }) => {
    const body = await request.json();

    const bodyObj = typeof body === 'object' && body !== null ? body : {};
    const newDashboard = {
      id: Date.now().toString(),
      title: bodyObj.title ?? bodyObj.name ?? 'Untitled Dashboard',
      ...bodyObj,
    };

    dashboards.unshift(newDashboard);

    return HttpResponse.json(newDashboard, { status: 201 });
  }),
];