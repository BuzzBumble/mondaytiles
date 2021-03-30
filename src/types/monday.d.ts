import { group } from "node:console";

declare namespace Monday {
  export interface ColumnValue {
    id?: string;
    text?: string;
    title?: string;
    type?: string;
    value?: string;
    additional_info?: string;
  }

  export interface Item {
    id?: string;
    board?: Board;
    column_values?: [ColumnValue];
    created_at?: string;
    updated_at?: string;
    creator?: User;
    creator_id?: string;
    group: Group;
    name: string;
    State?: "all" | "active" | "archived" | "deleted";
  }

  export interface Group {
    id?: string;
    archived?: boolean;
    color?: string;
    deleted?: boolean;
    items?: [Item];
    position?: string;
    title?: string;
  }

  export interface BoardColumn {
    id?: string;
    archived?: boolean;
    pos?: string;
    settings_str?: string;
    title?: string;
    type?: string;
    width?: number;
  }

  export interface Board {
    board_folder_id?: string;
    board_kind?: string;
    columns?: [BoardColumn];
    communication?: Object;
    description?: string;
    groups?: [Group];
    items: [Item];
  }

  export interface Context {
    boardIds: [number],
    editMode: boolean,
    instanceId: number,
    instanceType: string,
    itemIds: [number] | undefined,
    theme: string,
    user: Object,
    viewMode: string
  }
}