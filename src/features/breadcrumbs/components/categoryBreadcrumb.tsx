import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~components/ui/breadcrumb';
import { useBreadcrumbs } from '~features/breadcrumbs/hooks/useBreadcrumbs';
import { Link } from 'react-router';

export const CategoryBreadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          return index === breadcrumbs.length - 1 ? (
            <>
              <BreadcrumbItem key={breadcrumb.name} className="capitalize">
                <span>{breadcrumb.name}</span>
              </BreadcrumbItem>
            </>
          ) : (
            <>
              <BreadcrumbItem key={breadcrumb.name} className="capitalize">
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.path} className="cursor-pointer hover:underline">
                    {breadcrumb.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
