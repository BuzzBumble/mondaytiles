import { group } from "node:console";

interface Item {
  id?: String;
  board?: Board;
  column_values?: ColumnValue;
  created_at?: String;
  updated_at?: String;
  creator?: User;
  creator_id?: String;
  group: Group;
  name?: String;
  State?: "all" | "active" | "archived" | "deleted";
}

interface Group {
  id?: String;
  archived?: Boolean;
  color?: String;
  deleted?: Boolean;
  items?: [Item];
  position?: String;
  title?: String;
}

interface BoardColumn {
  id?: String;
  archived?: Boolean;
  pos?: String;
  settings_str?: String;
  title?: String;
  type?: String;
  width?: Number
}

interface Board {
  board_folder_id?: Number;
  board_kind?: String;
  columns?: [BoardColumn];
  communication?: Object;
  description?: String;
  groups?: [Group];
}