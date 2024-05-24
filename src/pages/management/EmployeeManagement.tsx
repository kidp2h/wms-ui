import { useGetEmployeeByIdQuery } from '@/services';
export default function EmployeeManagement() {
  const { data: employee } = useGetEmployeeByIdQuery(
    '0d764fdb-8910-44f3-b2ce-7eff5f6c33e8',
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
