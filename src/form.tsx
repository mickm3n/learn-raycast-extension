import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { FormValidation, useForm } from "@raycast/utils";
import { createSpark } from "./api";

type FormValues = {
  thought: string;
};

export default function SparkForm() {
  const { itemProps, handleSubmit, reset } = useForm<FormValues>({
    validation: {
      thought: FormValidation.Required,
    },
    async onSubmit(values) {
      await showToast({ style: Toast.Style.Animated, title: "記錄想法中..." });

      try {
        await createSpark(values.thought);
        await showToast({ style: Toast.Style.Success, title: "已記錄想法" });
        reset();
      } catch (error) {
        await showToast({
          style: Toast.Style.Failure,
          title: "記錄失敗",
          message: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="記錄想法" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="thought"
        title="想法"
        placeholder="寫下你的想法..."
        autoFocus
        {...itemProps.thought}
      />
    </Form>
  );
}
