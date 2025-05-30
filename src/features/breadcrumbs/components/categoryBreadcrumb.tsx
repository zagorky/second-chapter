import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~components/ui/breadcrumb';
import { useBreadcrumbs } from '~features/breadcrumbs/hooks/useBreadcrumbs';
import { Fragment } from 'react';
import { Link } from 'react-router';

export const CategoryBreadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          return index === breadcrumbs.length - 1 ? (
            <BreadcrumbItem key={breadcrumb.name} className="capitalize">
              <span>{breadcrumb.name}</span>
            </BreadcrumbItem>
          ) : (
            <Fragment key={breadcrumb.name}>
              <BreadcrumbItem className="capitalize">
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.path} className="cursor-pointer hover:underline">
                    {breadcrumb.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
