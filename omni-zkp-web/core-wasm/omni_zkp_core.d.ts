/* tslint:disable */
/* eslint-disable */

export class IdentityResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly commitment: string;
    readonly salt: string;
    readonly secret: string;
}

export function create_secure_identity(): IdentityResult;

export function generate_nullifier_hash(secret: string, scope: string): string;

/**
 * Splits `secret_hex` into `total` shares using Shamir Secret Sharing over GF(2⁸).
 * Any `threshold` shares are sufficient to reconstruct the secret; fewer reveal nothing.
 * Shares are hex-encoded and joined as CSV for safe transport across the WASM boundary.
 */
export function generate_shards(secret_hex: string, total: number, threshold: number): string;

export function init(): void;

export function recover_secret_from_shards(shards_csv: string, threshold: number): string | undefined;

/**
 * Entry point for the Halo2 ZK proof pipeline, exposed to the WASM host.
 *
 * Validates two cryptographic properties before synthesising the circuit:
 * 1. **TEE Attestation** — rejects payloads not signed by a trusted hardware enclave.
 * 2. **Nullifier Revocation** — checks the caller's nullifier against a public blacklist.
 *
 * The `OmniCircuit` enforces spatio-temporal constraints via two polynomial gates:
 * a location geofence (distance in 100m increments, max 500m) and a time-lock gate
 * (signal age in 5s increments, max 30s). Proof runs on a KZG-backed MockProver
 * with k=5 (32 rows), providing enough blinding rows for the constraint system.
 */
export function verify_proof_js(user_lat: bigint, user_time: bigint, target_lat: bigint, target_time: bigint, user_nullifier_hex: string, hardware_sig: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_identityresult_free: (a: number, b: number) => void;
    readonly create_secure_identity: () => number;
    readonly generate_nullifier_hash: (a: number, b: number, c: number, d: number) => [number, number];
    readonly generate_shards: (a: number, b: number, c: number, d: number) => [number, number];
    readonly identityresult_commitment: (a: number) => [number, number];
    readonly identityresult_salt: (a: number) => [number, number];
    readonly identityresult_secret: (a: number) => [number, number];
    readonly recover_secret_from_shards: (a: number, b: number, c: number) => [number, number];
    readonly verify_proof_js: (a: bigint, b: bigint, c: bigint, d: bigint, e: number, f: number, g: number, h: number) => [number, number];
    readonly init: () => void;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
