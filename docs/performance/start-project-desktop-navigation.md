# Start-project desktop navigation performance

The initial marketing shell now renders a lightweight navigation trigger and keeps the animated full-screen navigation runtime out of the first route bundle.

The existing animated navigation, focus trap, Escape handling, active links, account state, and menu visuals load on the first menu hover, focus, touch, or click. The menu opens automatically after its runtime is ready.

This removes Motion and the full navigation controller work from the initial `/start-project` load while preserving the existing interaction after activation.
