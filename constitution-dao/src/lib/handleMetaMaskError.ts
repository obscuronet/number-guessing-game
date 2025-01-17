import { serializeError } from "@metamask/rpc-errors";

export function handleMetaMaskError(error: any) {
  if (!error) {
    return "Unknown error";
  }

  if (!error.code) {
    return error.message ?? error;
  }

  const serializedError = serializeError(error);
  const serializedErrorData = serializedError?.data as any;
  const errorMessage =
    serializedErrorData?.cause?.error?.data?.message ??
    serializedErrorData?.message;

  if (errorMessage?.includes("no signed viewing keys")) {
    return `Missing viewing key. It looks like you may not have registered through the <a href="https://testnet.ten.xyz/" class="connect-link" target="_blank" rel="noopener noreferrer">gateway</a>`;
  }

  if (
    errorMessage?.includes(
      "invalid viewing key signature for requested address"
    )
  ) {
    return `Invalid viewing key. Please ensure the connected account is also authenticated via the gateway <a href="https://testnet.ten.xyz/" class="connect-link" target="_blank" rel="noopener noreferrer">here</a>`;
  }

  return errorMessage;
}
