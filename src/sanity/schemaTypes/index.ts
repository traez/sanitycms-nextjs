import { type SchemaTypeDefinition } from 'sanity'
import { postType } from "./postType";
import { tagType } from "./tagType";
import { commentType } from "./commentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, tagType, commentType,],
};
