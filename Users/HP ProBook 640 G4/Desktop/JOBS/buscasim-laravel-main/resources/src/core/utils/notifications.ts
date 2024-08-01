import { notifications } from "@mantine/notifications";

export function showSuccess(message: string) {
  notifications.show({
    message,
    color: "green",
  });
}

export function showError(message: string) {
  notifications.show({
    message,
    color: "red",
  });
}
