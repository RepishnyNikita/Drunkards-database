import { openDB } from 'idb';

const dbPromise = openDB('MyReviewDB', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('reviews')) {
      db.createObjectStore('reviews', { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains('markers')) {
      db.createObjectStore('markers', { keyPath: 'date' });
    }
  },
});

export const addReview = async (review) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('reviews', 'readwrite');
    const store = tx.objectStore('reviews');
    await store.add(review);
    await tx.done;
  } catch (error) {
    console.error('Error adding review:', error);
  }
};

export const getAllReviews = async () => {
  try {
    const db = await dbPromise;
    return await db.getAll('reviews');
  } catch (error) {
    console.error('Error getting all reviews:', error);
  }
};

export const deleteReview = async (id) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('reviews', 'readwrite');
    const store = tx.objectStore('reviews');
    await store.delete(id);
    console.log('Удален отзыв с id:', id);
    await tx.done;
  } catch (error) {
    console.error('Ошибка удаления отзыва:', error);
  }
};

export const addMarker = async (marker) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('markers', 'readwrite');
    const store = tx.objectStore('markers');
    await store.put(marker);
    await tx.done;
  } catch (error) {
    console.error('Error adding marker:', error);
  }
};

export const getAllMarkers = async () => {
  try {
    const db = await dbPromise;
    return await db.getAll('markers');
  } catch (error) {
    console.error('Error getting all markers:', error);
  }
};

export const getMarker = async (key) => {
  try {
    const db = await dbPromise;
    return await db.get('markers', key);
  } catch (error) {
    console.error('Error fetching marker:', error);
  }
};

export const deleteMarker = async (date) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('markers', 'readwrite');
    const store = tx.objectStore('markers');
    await store.delete(date);
    await tx.done;
  } catch (error) {
    console.error('Error deleting marker:', error);
  }
};
