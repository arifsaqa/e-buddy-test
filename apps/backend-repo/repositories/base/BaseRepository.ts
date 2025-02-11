import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { IRead } from "../interfaces/IRead";
import { IWrite } from "../interfaces/IWrite";
import { firestore } from "../../config/firebaseConfig";

type WithId<T> = T & { id: string };

export abstract class BaseRepository<T extends DocumentData>
  implements IWrite<T>, IRead<T>
{
  public readonly _collection: CollectionReference;

  constructor(collectionName: string) {
    this._collection = firestore.collection(collectionName);
  }

  async create(item: T): Promise<T> {
    try {
      const docRef = await this._collection.add(item);
      const docSnap = await docRef.get();

      return docSnap.data() as T;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  }
  async update(id: string, item: T): Promise<boolean> {
    try {
      await this._collection.doc(id).update(item);
      return true;
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this._collection.doc(id).delete();
      return true;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }
  async find(): Promise<T[]> {
    try {
      const ref = await this._collection.get();

      if (ref.empty) {
        return [];
      } else {
        const data: T[] = [];
        ref.forEach((doc) => {
          const datahere = { id: doc.id, ...doc.data() };
          data.push(datahere as WithId<T>);
        });

        return data;
      }
    } catch (error) {
      console.error("Error reading documents:", error);
      throw error;
    }
  }
  async findOne(id: string): Promise<T | null> {
    try {
      const itemRef = await this._collection.doc(id).get();
      if (itemRef.exists) {
        return itemRef.data() as T;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error reading document ${id}:`, error);
      throw error;
    }
  }
}
