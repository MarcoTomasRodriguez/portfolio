import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import SpinIcon from "@components/SpinIcon";

export enum Status {
  NONE,
  SUCCESS,
  FAILURE,
  PENDING,
}

type StatusButtonProps = {
  status: Status;
};

const StatusButton = ({ status }: StatusButtonProps) => {
  const computeStyles = () => {
    switch (status) {
      case Status.SUCCESS:
        return "bg-green-500 hover:bg-green-600 cursor-not-allowed";
      case Status.FAILURE:
        return "bg-red-500 hover:bg-red-600";
      case Status.PENDING:
        return "bg-yellow-500 hover:bg-yellow-600 cursor-wait";
      case Status.NONE:
        return "bg-blue-700 hover:bg-blue-800";
    }
  };

  return (
    <button
      className={`w-full flex items-center justify-center p-2 rounded-md text-white ${computeStyles()}`}
      disabled={status == Status.SUCCESS || status == Status.FAILURE}
      aria-label="Submit contact form"
    >
      {status == Status.NONE && <>Send</>}
      {status == Status.SUCCESS && (
        <>
          Sent
          <CheckCircleIcon className="h-5 w-5 ml-1" />
        </>
      )}
      {status == Status.FAILURE && (
        <>
          Retry
          <ExclamationCircleIcon className="h-5 w-5 ml-1" />
        </>
      )}
      {status == Status.PENDING && (
        <>
          Sending
          <SpinIcon className="animate-spin h-4 w-4 ml-1" />
        </>
      )}
    </button>
  );
};

export default StatusButton;
