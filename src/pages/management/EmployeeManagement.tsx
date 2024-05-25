import { useGetEmployeeByIdQuery } from '@/services';
export default function EmployeeManagement() {
  const { data: employee } = useGetEmployeeByIdQuery(
    'c5384470-3464-4b7f-b75a-a36e2bac31b4',
  );
  return (
    <div>
      <ul>
        {employee && (
          <li key={employee.id}>
            {employee.id} - {employee.code}
          </li>
        )}
      </ul>
    </div>
  );
}
