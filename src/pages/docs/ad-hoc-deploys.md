
Once you added the Gimlet deploy step in your CI workflow, every commit becomes deployable in Gimlet - given that CI has built the commit and the workflow reached the Gimlet step.

This is possible as in the Gimlet step CI passed a large chunk of metadata to the Gimlet API, and Gimlet knows everything about the commit to perform an ad-hoc deploy.

![Step 1 screenshot](https://images.tango.us/public/edited_image_a6e4652d-8775-4353-87e5-5ff4bc1b276b.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2405%3A255)

To make an ad-hoc deployment, let's finish this tutorial by clicking the *Deploy* dropdown on a commit and deploy it on staging.

The rollout widget displays references to the gitops commits that Gimlet made to fulfill your deploy request, 

![Step 3 screenshot](https://images.tango.us/public/screenshot_037a06c8-0ea1-45ee-8137-312a920d59c7.png?crop=focalpoint&fit=crop&fp-x=0.8464&fp-y=0.1156&fp-z=2.0741&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=3840%3A1960)

and you can see your newly deployed application on the Gimlet dashboard:

![Step 4 screenshot](https://images.tango.us/public/edited_image_6448f571-142f-4d34-942a-8030b74d4aab.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=1.0000&w=1200&mark-w=0.2&mark-pad=0&mark64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmsucG5n&ar=2508%3A737)

{% callout title="Can't see the deploy button on your commit?" %}
The deploy button becomes available for commits that CI has ran the Gimlet step for. If you don't see the deploy button, check your CI workflow and see if the Gimlet step was successful.
{% /callout %}
