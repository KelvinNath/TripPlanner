# -*- coding: utf-8 -*- #
# Copyright 2020 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Command to delete a Contact from Essential Contacts."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.essential_contacts import contacts
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.essential_contacts import flags
from googlecloudsdk.command_lib.essential_contacts import util


@base.ReleaseTracks(base.ReleaseTrack.ALPHA, base.ReleaseTrack.BETA,
                    base.ReleaseTrack.GA)
@base.UniverseCompatible
class Delete(base.DeleteCommand):
  """Delete an essential contact.

  ## EXAMPLES

  To delete the contact with id ``123'' in the current project, run:

        $ {command} 123

  To delete the contact with id ``123'' in the folder with id ``456'', run:

      $ {command} 123 --folder=456

  To delete the contact with id ``123'' in the organization with id ``456'',
  run:

        $ {command} 123 --organization=456
  """

  @staticmethod
  def Args(parser):
    """Adds command-specific args."""
    flags.AddContactIdArg(parser, help_text='id of contact to delete.')
    flags.AddParentArgs(parser)

  def Run(self, args):
    """Runs the delete command."""
    contact_name = util.GetContactName(args)
    client = contacts.ContactsClient()
    return client.Delete(contact_name)
