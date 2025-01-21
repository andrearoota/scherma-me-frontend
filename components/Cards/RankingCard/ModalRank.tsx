import { Modal, ModalProps } from '@mantine/core';

interface ModalRankProps extends ModalProps {
  row: number | undefined;
}

export default function ModalRank(props: ModalRankProps): JSX.Element {
  const { row, ...others } = props;
  return (
    <Modal title="Authentication" {...others}>
      <div>{row}</div>
    </Modal>
  );
}
