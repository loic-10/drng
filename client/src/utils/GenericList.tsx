import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: GenericListProps) {
  return !props.list
    ? props.loadingUI || <Loading />
    : !props.list.length
    ? props.emptyListUI || <>There are no movies to display</>
    : props.children;
}

interface GenericListProps {
  list: any;
  loadingUI?: ReactElement;
  emptyListUI?: ReactElement;
  children: ReactElement;
}
