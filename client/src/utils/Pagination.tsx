import { useEffect, useState } from "react";

export default function Pagination(props: PaginationProps) {
  const [linkModels, setLinkModels] = useState<LinkModel[]>([]);

  function selectPage(link: LinkModel) {
    if (link.page === props.currentPage || !link.enabled) {
      return;
    }
    props.onChange(link.page);
  }

  function getClass(link: LinkModel) {
    if (link.active) {
      return "active pointer";
    }
    if (!link.enabled) {
      return "disabled";
    }
    return "pointer";
  }

  useEffect(() => {
    const previousPageEnabled = props.currentPage !== 1;
    const previousPage = props.currentPage - 1;
    const links: LinkModel[] = [];
    links.push({
      page: previousPage,
      text: "Previous",
      enabled: previousPageEnabled,
      active: false,
    });

    for (let i = 1; i <= props.totalAmountOfPages; i++) {
      if (
        i >= props.currentPage - props.radio &&
        i <= props.currentPage + props.radio
      ) {
        links.push({
          text: `${i}`,
          active: props.currentPage === i,
          enabled: true,
          page: i,
        });
      }
    }
    const nextPageEnabled =
      props.currentPage !== props.totalAmountOfPages &&
      props.totalAmountOfPages > 0;
    const nextPage = props.currentPage + 1;

    links.push({
      text: "Next",
      page: nextPage,
      enabled: nextPageEnabled,
      active: false,
    });

    setLinkModels(links);
  }, [props.currentPage, props.totalAmountOfPages, props.radio]);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {linkModels.map((link) => (
          <li
            key={link.text}
            onClick={() => selectPage(link)}
            className={`page-item cursor ${getClass(link)}`}
          >
            <span className="page-link">{link.text}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface LinkModel {
  page: number;
  enabled: boolean;
  text: string;
  active: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalAmountOfPages: number;
  radio: number;
  onChange(page: number): void;
}

Pagination.defaultProps = {
  radio: 3,
};
