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

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.name}>
            <BreadcrumbItem className="capitalize">
              <BreadcrumbLink asChild>
                <Link to={breadcrumb.path} className="cursor-pointer hover:underline">
                  {breadcrumb.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
