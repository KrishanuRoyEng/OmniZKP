# Zero-Knowledge Properties: Formal Arguments

Our WebAssembly circuit is built on the Halo2 proving system over the BN254 curve. We formally assert the following four ZKP properties, verified by our integration test suite.

## 1. Completeness
**Argument:** Let our circuit be a boolean relation $R(x, w)$. The public instance $x$ is the target coordinates and verifier scope $v$. The private witness $w$ is the user's distance $d$, time $t$, and the hardware TEE signature $\sigma$. 
If $d \in R_{valid}$ and $\text{VerifySignature}(\sigma, d, t) = \text{True}$, the polynomial constraints are satisfied. The prover generates a valid KZG commitment $\pi$, and the verifier algorithm outputs $V(x, \pi) = \text{True}$ with probability $1$.

## 2. Soundness
**Argument:** If a user is outside the geofence or spoofing data, a computationally bounded prover cannot convince the verifier. 
If the user inputs a manipulated distance $d_{invalid}$, the custom gate $C_{geo}(d_{invalid}) \neq 0$. Due to the binding property of the KZG commitment scheme, the probability of forging a valid proof $\pi'$ for this invalid state is negligible. Furthermore, if the TEE signature $\sigma$ is invalid, the arithmetic gate aborts execution before polynomial synthesis.

## 3. Zero-Knowledge
**Argument:** The proof $\pi$ reveals absolutely nothing about the private witness $w$ to the verifier. The prover's witness values are blinded using random scalars drawn from the Galois Field $\mathbb{F}_p$ before being committed to the polynomial $P(X)$. The verifier learns that the policy is met, but computationally cannot extract the exact values of $d$, $t$, or $s$ from $\pi$.

## 4. Unlinkability
**Argument:** Given $N_A$ (Chase Bank) and $N_B$ (Zomato), it is computationally infeasible for Verifiers A and B to determine if both nullifiers were derived from the same preimage $s$ due to the collision resistance and one-wayness of the underlying hash algorithm.