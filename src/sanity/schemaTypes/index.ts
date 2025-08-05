import { type SchemaTypeDefinition } from 'sanity'
import { postType } from "./postType";
import { tagType } from "./tagType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, tagType,],
};
