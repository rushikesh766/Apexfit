import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, hasFirebaseConfig, storage } from "./firebase";
import type { Announcement, CheckIn, Member, NotificationItem, Payment } from "./types";

export async function saveMember(member: Member) {
  if (!hasFirebaseConfig || !db) return { mode: "demo", id: member.id };
  await setDoc(doc(db, "members", member.id), { ...member, updatedAt: serverTimestamp() });
  return { mode: "firebase", id: member.id };
}

export async function saveCheckIn(checkIn: CheckIn) {
  if (!hasFirebaseConfig || !db) return { mode: "demo", id: checkIn.id };
  await setDoc(doc(db, "checkIns", checkIn.id), { ...checkIn, createdAt: serverTimestamp() });
  return { mode: "firebase", id: checkIn.id };
}

export async function savePayment(payment: Payment) {
  if (!hasFirebaseConfig || !db) return { mode: "demo", id: payment.id };
  await setDoc(doc(db, "payments", payment.id), { ...payment, createdAt: serverTimestamp() });
  return { mode: "firebase", id: payment.id };
}

export async function sendAnnouncement(announcement: Announcement) {
  if (!hasFirebaseConfig || !db) return { mode: "demo", id: announcement.id };
  await setDoc(doc(db, "announcements", announcement.id), {
    ...announcement,
    pushedAt: serverTimestamp()
  });
  return { mode: "firebase", id: announcement.id };
}

export async function queueNotification(notification: NotificationItem) {
  if (!hasFirebaseConfig || !db) return { mode: "demo", id: notification.id };
  const result = await addDoc(collection(db, "notificationQueue"), {
    ...notification,
    queuedAt: serverTimestamp()
  });
  return { mode: "firebase", id: result.id };
}

export async function updateMemberStatus(memberId: string, status: Member["status"]) {
  if (!hasFirebaseConfig || !db) return { mode: "demo", id: memberId };
  await updateDoc(doc(db, "members", memberId), { status, updatedAt: serverTimestamp() });
  return { mode: "firebase", id: memberId };
}

export async function uploadTransformationAsset(memberId: string, file: File) {
  if (!hasFirebaseConfig || !storage) {
    return { mode: "demo", url: URL.createObjectURL(file) };
  }
  const assetRef = ref(storage, `transformations/${memberId}/${Date.now()}-${file.name}`);
  await uploadBytes(assetRef, file);
  const url = await getDownloadURL(assetRef);
  return { mode: "firebase", url };
}
