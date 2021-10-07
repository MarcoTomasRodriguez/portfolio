import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import SpinIcon from "@components/SpinIcon";

export enum RequestStatus {
  None,
  Pending,
  Success,
  Failure,
}

export type StatusButtonProps = React.ComponentProps<"button"> & {
  status: RequestStatus;
  defaultText: string;
  pendingText: string;
  successText: string;
  failureText: string;
};

const StatusButton = ({
  status,
  defaultText,
  pendingText,
  successText,
  failureText,
  ...props
}: StatusButtonProps) => {
  const resolveButtonStyles = () => {
    switch (status) {
      case RequestStatus.None:
        return "bg-blue-700 hover:bg-blue-800";
      case RequestStatus.Pending:
        return "bg-yellow-500 hover:bg-yellow-600 cursor-wait";
      case RequestStatus.Success:
        return "bg-green-500 hover:bg-green-600 cursor-not-allowed";
      case RequestStatus.Failure:
        return "bg-red-500 hover:bg-red-600";
    }
  };

  return (
    <button
      className={`w-full flex items-center justify-center p-2 rounded-md text-white ${resolveButtonStyles()}`}
      disabled={
        status == RequestStatus.Pending || status == RequestStatus.Success
      }
      {...props}
    >
      {status == RequestStatus.None && defaultText}
      {status == RequestStatus.Pending && (
        <>
          {pendingText}
          <SpinIcon className="animate-spin h-4 w-4 ml-1" />
        </>
      )}
      {status == RequestStatus.Success && (
        <>
          {successText}
          <CheckCircleIcon className="h-5 w-5 ml-1" />
        </>
      )}
      {status == RequestStatus.Failure && (
        <>
          {failureText}
          <ExclamationCircleIcon className="h-5 w-5 ml-1" />
        </>
      )}
    </button>
  );
};

export default StatusButton;
