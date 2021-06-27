/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable prefer-arrow/prefer-arrow-functions */

export function convertSnaps<T>(snaps){
  return <T[]> snaps.map( snap => {
   return {
     id: snap.payload.doc.id,
     ...snap.payload.doc.data()
   }
  }
  );

}
