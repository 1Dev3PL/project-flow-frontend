declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.css";

declare module "*.svg" {
  const content: string;
  export default content;
}