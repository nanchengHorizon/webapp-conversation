import { Menu, Transition, Dialog } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { delConversation, renameConversation, pinConversation, unpinConversation } from '@/service'
import { EditInactiveIcon, DeleteInactiveIcon, MoveInactiveIcon, EditActiveIcon, DeleteActiveIcon, MoveActiveIcon } from './icon'
import Toast from '@/app/components/base/toast'
import eventBus from '@/utils/eventBus'
const { notify } = Toast
var once = 0

export default function Editor({ item }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [renameName, setRenameName] = useState(item?.name)
  var conversationList: any[] = JSON.parse(localStorage.getItem('conversationList') || '[]')
  // 订阅者
  const handleUserUpdate = (userData: []) => {
    conversationList = userData
  };
  if (once === 0) {
    const unsubscribe = eventBus.subscribe('userUpdate', handleUserUpdate);
    once = 1
  }

  const deleteChatAlert = (event: any) => {
    setIsOpen(true)
    event.stopPropagation();
  }
  const deleteChat = () => {
    delConversation(item?.id).then(res => {
      setIsOpen(false)
      conversationList = conversationList.filter((conv: any) => conv.id !== item.id)
      // 发布者发布事件
      eventBus.publish('userUpdate', conversationList);
    })
  }
  const saveRename = () => {
    if (!renameName) {
      notify({ type: 'error', message: 'Please input conversation name', duration: 3000 })
      return
    }
    renameConversation(item?.id, renameName).then(res => {
      setIsRenameOpen(false)
      conversationList = conversationList.map((conv: any) => conv.id === item.id ? { ...conv, name: renameName } : conv)
      eventBus.publish('userUpdate', conversationList);
      notify({ type: 'success', message: 'Rename conversation success', duration: 3000 })
      console.log(conversationList)
    })
  }
  return (
    <div style={{ height: '20px' }}>
      <Menu as="div" className="relative inline-block text-left" style={{ height: '20px' }}>
        <Menu.Button >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" style={{ top: '28px' }}>
            {/* <div className="px-1 py-1 " onClick={() => pinConversation(item?.id)}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Pin
                  </button>
                )}
              </Menu.Item>
            </div> */}
            <div className="px-1 py-1 " onClick={() => setIsRenameOpen(true)}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Rename
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1" onClick={deleteChatAlert}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu >
      {/* 删除弹窗 */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete conversation
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this conversation?
                    </p>
                  </div>
                  <div className="flex pt-6 gap-2 justify-end items-start self-stretch">
                    <button type="button" className="btn disabled:btn-disabled btn-secondary btn-medium" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button type="button" className="btn disabled:btn-disabled btn-primary btn-medium btn-destructive" onClick={deleteChat}>Confirm</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* 重命名弹窗 */}
      <Transition appear show={isRenameOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsRenameOpen(true)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Rename Conversation
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Conversation name
                    </p>
                    <input className="mt-2 w-full rounded-lg h-10 box-border px-3 text-sm leading-10 bg-gray-100" placeholder="Please input conversation name" value={renameName} onChange={(e) => setRenameName(e.target.value)} />
                  </div>
                  <div className="flex pt-6 gap-2 justify-end items-start self-stretch">
                    <button type="button" className="btn disabled:btn-disabled btn-secondary btn-medium" onClick={() => setIsRenameOpen(false)}>Cancel</button>
                    <button type="button" className="btn disabled:btn-disabled btn-primary btn-medium btn-destructive" onClick={saveRename}>Save</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}