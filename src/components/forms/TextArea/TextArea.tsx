import { TextAreaWithDisplayProps, TextArea as TextAreaUI } from "@deskpro/deskpro-ui";
import { forwardRef, Ref } from "react";
import styled from "styled-components";

type Props = TextAreaWithDisplayProps & {
  minHeight?: string,
}

const TextArea = styled(forwardRef(({ ...props }: Props, ref: Ref<HTMLTextAreaElement>) =>
  <TextAreaUI {...props} ref={ref} />
)) <Props>`
  min-height: ${({ minHeight }) => minHeight};
  align-items: flex-start;
  resize: none;
`;

export default TextArea
