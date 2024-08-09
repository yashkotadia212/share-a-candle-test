export default function areEmailsSame(email1, email2) {
  // Trim and convert both emails to lowercase
  const normalizedEmail1 = email1?.trim().toLowerCase();
  const normalizedEmail2 = email2?.trim().toLowerCase();

  // Compare the normalized emails
  return normalizedEmail1 === normalizedEmail2;
}